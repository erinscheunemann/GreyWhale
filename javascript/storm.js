window.addEventListener('load', function() {
    // divs for pages
    let storm = document.getElementById('storm');
    let beaufort = document.getElementById('beaufort');
    // buttons for switching between pages
    let showBeau = document.getElementById('bfws');
    let showStorm = document.getElementById('s');
    let finished = document.getElementById('fin');
    // button for storm
    let stormBtn = document.getElementById('stormBtn');
    // div for storm info
    let stormInfo = document.getElementById('stormInfo');
    let stormRoll = document.getElementById('stormRoll');
    // spans for storm severity and effects
    let bfn = document.getElementById('bfn');
    let ws = document.getElementById('ws');
    let bfd = document.getElementById('bfd');
    let daysLost = document.getElementById('daysLost');
    let speedLost = document.getElementById('speedLost');
    // flag to make sure stormBtn was clicked by user
    let clicked = false;

    // maps for windspeed and description on beaufort scale
    let windspeed = new Map([[0,"0"],[1,"1-3"],[2,"4-7"],[3,"8-12"],[4,"13-18"],[5,"19-24"],
    [6,"25-31"],[7,"32-38"],[8,"39-46"],[9,"47-54"],[10,"55-60"],[11,"64-73"],[12,"74-95"]]);
    let description = new Map([[0,"calm and smoke rises vertically"],[1,"wind motion visible in smoke"],
    [2,"wind can be felt on exposed skin and leaves rustle"],[3,"leaves and smaller twigs in constant motion"],
    [4,"dust and loose paper is raised and small branches begin to move."],[5,"smaller trees sway"],
    [6,"large branches in motion, whistling heard in overhead wires, and umbrella use becomes difficult"],
    [7,"whole trees in motion and some difficulty when walking in the wind"],[8,"twigs broken from trees and cars veer on road"],
    [9,"light structural damage"],[10,"trees uprooted and considerable structural damage"],
    [11,"widespread structural damage"],[12,"considerable and widespread damage to structures"]]);
    
    // event listeners to hide/show pages
    showBeau.addEventListener('click', function() {
        storm.style.display = 'none';
        beaufort.style.display = 'block';
    });

    showStorm.addEventListener('click', function() {
        storm.style.display = 'block';
        beaufort.style.display = 'none';
    });

    // roll storm
    stormBtn.addEventListener('click', function() {
        // hide and unhide right divs 
        stormInfo.style.display = 'none';
        stormRoll.style.display = 'block';
        let severity = Math.floor(Math.random() * 13); // get beaufort number
        // put information in span
        bfn.innerHTML = severity;
        ws.innerHTML = windspeed.get(severity);
        bfd.innerHTML = description.get(severity);
        let dl = Math.trunc(Math.round(severity/2)); // lose half the severity in days
        daysLost.innerHTML = dl;
        let days = Number(sessionStorage.getItem('days'));
        sessionStorage.setItem('days', days+dl);
        if (severity >= 10) { // lose speed if storm is bad enough
            let speed = Number(sessionStorage.getItem("kmph"));
            let decrease = 0.5;
            // check if speed decrease will go lower than 4 kmph
            if (speed - decrease <= 4) {
                sessionStorage.setItem("kmph", 4);
                decrease = speed - 4;
            } else {
                sessionStorage.setItem("kmph", speed - decrease);
            }
            speedLost.innerHTML = "and " + decrease + " KMPH";
        }
        clicked = true;
    });

    finished.addEventListener('click', function() {
        if (clicked) { // check if rolled for storm
            window.location.replace('swim.html');
        } else { // don't let them leave without rolling
            alert("ROLL FOR STORM!");
        }
    });

});