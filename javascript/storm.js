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
    let windspeed = new Map([[0,"0-1"],[1,"1-4"],[2,"5-8"],[3,"9-14"],[4,"15-20"],[5,"21-15"],
    [6,"26-31"],[7,"32-37"],[8,"38-43"],[9,"44-54"],[10,"55-66"],[11,"67-71"],[12,"72+"]]);
    let description = new Map([[0,"smoke rises vertically"],[1,"airsmoke drifts, tree leaves move"],
    [2,"leaves rustle, wind can be felt"],[3,"leaves and twigs in motion"],[4,"small branches move"],
    [5,"small trees with leaves sway"],[6,"wind whistles, large branches move"],[7,"whole trees move, difficult to walk"],
    [8,"twigs break off of trees"],[9,"branches break, some damage to roots, trees uprooted, heavy building damage"],
    [10,"considerable damage, widespread damage"],[11,"very rarely experienced"],[12,"severe damage"]]);
    
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
        let dl = Math.round(severity/2); // lose half the severity in days
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