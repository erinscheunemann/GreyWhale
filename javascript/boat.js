window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('cs');
    // get days
    let days = Number(sessionStorage.getItem('days'));

    btn.addEventListener('click', function() {
        sessionStorage.setItem('days', days+2); // add two days to total days traveled 
        let diceRoll = Math.random(); // roll for survival
        if (diceRoll <= 0.1) {
            window.location.replace('net.html');
        } else if (diceRoll > 0.1 && diceRoll <=0.2) { // get hit and killed
            sessionStorage.setItem('outcome', 'b'); // set outcome to boat death
            window.location.replace('result.html');
        } else {
            window.location.replace('swim.html');
        }
    });
});