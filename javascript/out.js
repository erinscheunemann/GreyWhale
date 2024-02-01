window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('outter');
    // get distance
    let distance = Number(sessionStorage.getItem('distance'));

    btn.addEventListener('click', function() {
        sessionStorage.setItem('distance', distance+80); // route longer by 80km
        
        let diceRoll = Math.random(); // roll for speed advantage
        if(diceRoll < 0.25) { // 25% chance of gaining 0.5 KMPH
            let speed = Number(sessionStorage.getItem('kmph'));
            sessionStorage.setItem('kmph', speed-0.5);
        } else { // 75% chance of nothing happening
            // placeholder for something to happen
        }
        window.location.replace('swim.html'); // go back to swimming
    });
});