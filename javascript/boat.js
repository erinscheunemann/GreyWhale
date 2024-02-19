window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('cs');

    btn.addEventListener('click', function() {
        let diceRoll = Math.random(); // roll for survival
        if (diceRoll <= 0.1) {
            window.location.replace('net.html');
        } else {
            window.location.replace('avoidnet.html');
        }
    });
});