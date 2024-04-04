window.addEventListener('load', function() {
    // get continue swimming button
    let btn = document.getElementById('cs');
    // get span for all speed stuff
    let eat = document.getElementById("eat");
    // get span for increase
    let inc = document.getElementById("inc");
    // get speed and days
    let speed = Number(sessionStorage.getItem('kmph'));
    let days = Number(sessionStorage.getItem('days'));

    if(speed >= 12) { // dont change speed if speed is 12
        eat.style.display = "none";
    }

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
        // increase speed and lose 2 weeks of time
        sessionStorage.setItem("kmph", speed + increase);
        sessionStorage.setItem("days", days + 14);
        window.location.replace('swim.html');
    });
});