window.addEventListener('load', function (){
    // get continue swimming button
    let btn = document.getElementById('cs');
    // get span for increase
    let inc = document.getElementById("inc");
    // get speed and days
    let speed = Number(sessionStorage.getItem('kmph'));
    let days = Number(sessionStorage.getItem('days'));

    // set increase
    let increase = 0.5;
    let incText = "0.5";
    // check if increase will reach max speed of 12
    if (speed + increase >= 12) {
        increase = 12 - speed;
        incText = String(increase).slice(0,3); // sort of rounding
    }
    inc.innerHTML = incText;
    

    btn.addEventListener('click', function() {
        // add speed and time taken
        sessionStorage.setItem('days', days+2);
        sessionStorage.setItem('kmph', speed+increase);
    });
});