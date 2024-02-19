window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('cs');
    // get days and speed
    let speed = Number(sessionStorage.getItem('kmph'));

    
    

    btn.addEventListener('click', function() {
        let diceRoll = Math.random(); // roll for survival
        if (diceRoll <= 0.5) { // survive but are injured
            // lose 0.5 kmph of speed due to injuries
            if (speed - 0.5 <= 4) { // check if speed decrease will go lower than 4 kmph
                sessionStorage.setItem("kmph", 4);
            } else {
                sessionStorage.setItem("kmph", speed - 0.5);
            }
            window.location.replace('strikesurvival.html');
        } else { // die
            sessionStorage.setItem('outcome', 'b'); // set outcome to ship strike death
            window.location.replace('result.html'); // go to results
        }
    });
});