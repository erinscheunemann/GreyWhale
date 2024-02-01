window.addEventListener('load', function() {
    // get button
    let escape = document.getElementById("escape");

    escape.addEventListener('click', function() {
        let diceRoll = Math.random(); // roll for attack

        if(diceRoll <= 0.34) { // get killed
            sessionStorage.setItem('outcome', 'd'); // set outcome to death
            window.location.replace('result.html');
        } else { // survive
            window.location.replace('survived.html');
        }
    });
});