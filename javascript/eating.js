window.addEventListener('load', function (){
    // get paragraph for information
    let info = document.getElementById("info");
    let inc = document.getElementById("inc");
    // get continue eating button
    let btn = document.getElementById('ce');

    btn.addEventListener('click', function() {
        eat(); // eat
        // check if stuck in ice
        let diceRoll = Math.random(); // roll for event
        if(diceRoll < 0.10) { // 10% chance stuck in ice
            window.location.replace('ice.html'); // goto ice page
        } // else do nothing 
    });

    
        

    function eat() {
        // amount speed increases by in the 4 days
        let increase = 0.5;
        let incText = "0.5";
        // add speed and time taken
        // get days, speed, and total increase
        let days = Number(sessionStorage.getItem('days')); 
        let speed = Number(sessionStorage.getItem('kmph'));
        let kmphIncrease = Number(sessionStorage.getItem("kmphIncrease"));
        // check if increase will reach max speed of 12
        if (speed + increase >= 12) {
            increase = 12 - speed; 
            incText = String(increase).slice(0,3); // sort of rounding
            document.getElementById("continue").style.display = "none";
            document.getElementById("stop").style.display = "block";
            eat(); // bc start journy doesn't trigger event
        }
        inc.innerHTML = incText
        sessionStorage.setItem('days', days+4);
        sessionStorage.setItem('kmph', speed+increase);
        sessionStorage.setItem('kmphIncrease', kmphIncrease+increase);  
        // display in paragraph
        info.innerHTML = "So far, you have <strong>taken " + (days+4) +
                        " days</strong> to eat and have <strong>increased</strong> your speed by <strong>" + String(kmphIncrease+increase).slice(0,3) +
                        " KMPH</strong> to <strong>" + String(speed+increase).slice(0,3) + " KMPH</strong>."
    }
});