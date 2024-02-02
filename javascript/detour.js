window.addEventListener('load', function() {
    // get continue swimming button
    let btn = document.getElementById('cs');
    // get span for increase
    let inc = document.getElementById("inc");
    // get speed and days
    let speed = Number(sessionStorage.getItem('kmph'));
    let days = Number(sessionStorage.getItem('days'));

    // set increase
    let increase = 0.5;
    // check if increase will reach max speed of 12
    if (speed + increase >= 12) {
        increase = 12 - speed;
    }
    inc.innerHTML = increase;

    btn.addEventListener('click', function() {
        // increase speed and lose 2 weeks of time
        sessionStorage.setItem("kmph", speed + increase);
        sessionStorage.setItem("days", days + 14);
        window.location.replace('swim.html');
    });
});