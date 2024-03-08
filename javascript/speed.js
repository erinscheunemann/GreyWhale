window.addEventListener('load', function() {
    // first
    let fsd = document.getElementById("fsd");
    let ssd = document.getElementById("ssd");
    let tdd = document.getElementById("tdd");
    // then
    let total = document.getElementById("total");
    let cycles = document.getElementById("cycles");
    let kmph = document.getElementById("kmph");
    // hint buttons
    let tHint = document.getElementById("tHint");
    let cyHint = document.getElementById("cHint");
    let kmHint = document.getElementById("kHint");
    // hide hint buttons
    let htHint = document.getElementById("htHint");
    let hcHint = document.getElementById("hcHint");
    let hkHint = document.getElementById("hkHint");
    // hint answer boxes
    let f = document.getElementById("f");
    let s = document.getElementById("s");
    let t = document.getElementById("t");
    let tc = document.getElementById("tc");
    let kph = document.getElementById("kph");
    // home button
    let homeButton = document.getElementById('home');
    // speed info button
    let speedInfo = document.getElementById('speedInfo');
    // colors for correct and incorrect answers
    let borderWrong = "red";
    let backgroundWrong = "lightsalmon";
    let borderRight = "green";
    let backgroundRight = "mediumspringgreen"

    // populate first section 
    if(sessionStorage.getItem("first") != null) {
        fsd.value = Number(sessionStorage.getItem("first"));
    }
    if(sessionStorage.getItem("second") != null) {
        ssd.value = Number(sessionStorage.getItem("second"));
    }
    if(sessionStorage.getItem("third") != null) {
        tdd.value = Number(sessionStorage.getItem("third"));
    }
    // populate second section
    if(sessionStorage.getItem("total") != null) {
        total.value = Number(sessionStorage.getItem("total"));
    }
    if(sessionStorage.getItem("cycles") != null) {
        cycles.value = Number(sessionStorage.getItem("cycles"));
    }
    if(sessionStorage.getItem("kmph") != null) {
        kmph.value = Number(sessionStorage.getItem("kmph"));
    }

    

    // show and hide hints
    tHint.addEventListener("click", showHideHint);
    cyHint.addEventListener("click", showHideHint);
    kmHint.addEventListener("click", showHideHint);
    htHint.addEventListener("click", showHideHint);
    hcHint.addEventListener("click", showHideHint);
    hkHint.addEventListener("click", showHideHint);

    function showHideHint(e) {
        let prefix = this.id.charAt(0);
        if (prefix == 'h') { // button to hide hint
            prefix = this.id.charAt(1);
            let hintButtonDiv = document.getElementById(prefix+'hb');
            console.log(hintButtonDiv);
            hintButtonDiv.style.display = 'block';
            let hintDiv = document.getElementById(prefix+'ht');
            hintDiv.style.display = 'none';
        } else { // button to show hint
            let hintButtonDiv = document.getElementById(prefix+'hb');
            console.log(hintButtonDiv);
            hintButtonDiv.style.display = 'none';
            let hintDiv = document.getElementById(prefix+'ht');
            hintDiv.style.display = 'block';
        }
    }

    // check users hint answers
    f.addEventListener('input', checkTotal_Hint);
    s.addEventListener('input', checkTotal_Hint);
    t.addEventListener('input', checkTotal_Hint);
    tc.addEventListener('input', checkCycles_Hint);
    kph.addEventListener('input', checkKMPH_Hint);

    function checkTotal_Hint(e) {
        if (Number(f.value) == Number(fsd.value)) { // first time matches
            f.style.borderColor = borderRight;
            f.style.backgroundColor = backgroundRight;
        } else {
            f.style.borderColor = borderWrong;
            f.style.backgroundColor = backgroundWrong;
        }
        if (Number(s.value) == Number(ssd.value)) { // second time matches
            s.style.borderColor = borderRight;
            s.style.backgroundColor = backgroundRight;
        } else {
            s.style.borderColor = borderWrong;
            s.style.backgroundColor = backgroundWrong;
        }
        if (Number(t.value) == Number(tdd.value)) { // third time matches
            t.style.borderColor = borderRight;
            t.style.backgroundColor = backgroundRight;
        } else {
            t.style.borderColor = borderWrong;
            t.style.backgroundColor = backgroundWrong;
        }
    }

    function checkCycles_Hint(e) {
        if (Number(tc.value) == Number(fsd.value) + Number(ssd.value) + Number(tdd.value)) { // matches total dive time
            tc.style.borderColor = borderRight;
            tc.style.backgroundColor = backgroundRight;
        } else {
            tc.style.borderColor = borderWrong;
            tc.style.backgroundColor = backgroundWrong;
        }
    }

    function checkKMPH_Hint(e) {
        if (Number(kph.value) == round(60/(Number(fsd.value) + Number(ssd.value) + Number(tdd.value)),1)) { // matches total cycles in hour
            kph.style.borderColor = borderRight;
            kph.style.backgroundColor = backgroundRight;
        } else {
            kph.style.borderColor = borderWrong;
            kph.style.backgroundColor = backgroundWrong;
        }
    } 

    // check math upon page loading incase user comes back
    checkMath();
    // check users answers
    total.addEventListener('input', checkMath);
    cycles.addEventListener('input', checkMath);
    kmph.addEventListener('input', checkMath);
    // recheck users answers if they change the dive durations
    fsd.addEventListener('input', checkMath);
    ssd.addEventListener('input', checkMath);
    tdd.addEventListener('input', checkMath);

    function checkMath() {
        if (total.value != "") {checkTotal();}
        if (cycles.value != "") {checkCycles();}
        if (kmph.value != "") {checkKMPH();}
    }

    function checkTotal() {
        if (Number(total.value) == Number(fsd.value) + Number(ssd.value) + Number(tdd.value)) { // matches total dive time
            total.style.borderColor = borderRight;
            total.style.backgroundColor = backgroundRight;
        } else {
            total.style.borderColor = borderWrong;
            total.style.backgroundColor = backgroundWrong;
        }
    }

    function checkCycles() {
        if (total.value != 0){ // can't divide by 0
            if (Number(cycles.value) == round(60/(Number(fsd.value) + Number(ssd.value) + Number(tdd.value)), 1)) { // matches total cycles per hour 
                cycles.style.borderColor = borderRight;
                cycles.style.backgroundColor = backgroundRight;
            } else {
                cycles.style.borderColor = borderWrong;
                cycles.style.backgroundColor = backgroundWrong;
            }
        }
    }

    function checkKMPH() {
        if (Number(kmph.value) == round(round(60/(Number(fsd.value) + Number(ssd.value) + Number(tdd.value)), 1)*1.5, 1)) { // matches KMPH
            kmph.style.borderColor = borderRight; 
            kmph.style.backgroundColor = backgroundRight;
        } else {
            kmph.style.borderColor = borderWrong;
            kmph.style.backgroundColor = backgroundWrong;
        }
    }


    function round(value, place) { // function to round to place chosen 
        return Math.round(value * 10**place) / 10**place;
    }

    // SESSION STORAGE SPEED
    homeButton.addEventListener('click', checkSpeed);
    homeButton.addEventListener('click', store);
    speedInfo.addEventListener('click', store);
    function checkSpeed(e) {
        // check that kmph calculated value is correct to the tenth place
        if (Number(kmph.value) == round(round(60/(Number(fsd.value) + Number(ssd.value) + Number(tdd.value)), 1)*1.5, 1)) {
            sessionStorage.setItem('kmphCorrect', 1); // store correctness
        } else {
            alert("KMPH is not correct!\nMake sure to come back and correct it!"); // warn user their value is incorrect 
            sessionStorage.setItem('kmphCorrect', 0); // store correctness 
        }
        // sessionStorage.setItem('kmph', Number(kmph.value)); // store speed in session storage 
        window.location.href = "index.html";
    }

    function store() {
        sessionStorage.setItem("first", Number(fsd.value));
        sessionStorage.setItem("second", Number(ssd.value));
        sessionStorage.setItem("third", Number(tdd.value));
        sessionStorage.setItem("total", Number(total.value));
        sessionStorage.setItem("cycles", Number(cycles.value));
        sessionStorage.setItem("kmph", Number(kmph.value)); // for the game
        sessionStorage.setItem("ogKMPH", Number(kmph.value)); // for restart
    }
});



