window.addEventListener('load', function() {
    // get the ignore button
    let ignore = document.getElementById("ignore");


    ignore.addEventListener('click', function() { // 20% chance of attack
        let diceRoll = Math.random(); // roll for encounter
        if(diceRoll <= 0.2) { // get attacked
            window.location.replace('attack.html');
        } else { // they ignore you
            window.location.replace('ignore.html');
        }
    });
});