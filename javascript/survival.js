window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('cs');
    // get span for speed decrease 
    let speedLost = document.getElementById('sl');
    // get days and speed
    let speed = Number(sessionStorage.getItem('kmph'));

    let decrease = 0.5;
    // check if speed decrease will go lower than 4 kmph
    if (speed - decrease <= 4) {
        decrease = speed - 4;
    }
    speedLost.innerHTML = decrease;

    btn.addEventListener('click', function() {
        let decrease = 0.5;
        // check if speed decrease will go lower than 4 kmph
        if (speed - decrease <= 4) {
            sessionStorage.setItem("kmph", 4);
            decrease = speed - 4;
        } else {
            sessionStorage.setItem("kmph", speed - decrease);
        }
        speedLost.innerHTML = decrease;
    });
});