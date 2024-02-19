window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('cs');

    btn.addEventListener('click', function() {
        let diceRoll = Math.random(); // roll for survival
        if (diceRoll <= 0.1) { // struck by boat
            window.location.replace('struck.html');
        } else { // successfully avoided boat 
            window.location.replace('avoidvessel.html');
        }
    });
});