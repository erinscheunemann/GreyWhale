window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('inner');
    // get distance
    let distance = Number(sessionStorage.getItem('distance'));

    btn.addEventListener('click', function() {
        sessionStorage.setItem('distance', distance-80); // route shorter by 80km
        
        let diceRoll = Math.random(); // roll for speed disadvantage
        if(diceRoll < 0.75) { // 75% chance of losing 0.5 KMPH
            let speed = Number(sessionStorage.getItem('kmph'));
            sessionStorage.setItem('kmph', speed-0.5);
        } else { // 25% chance of losing one day of time
            let days = Number(sessionStorage.getItem('days'));
            sessionStorage.setItem('days', days+1);
        }
        window.location.replace('swim.html'); // go back to swimming
    });
});