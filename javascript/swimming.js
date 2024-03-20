window.addEventListener('load', function() {
    // put whale back on progress track
    document.documentElement.style.setProperty('--distance', `${Number(sessionStorage.getItem('progress'))}%`);
    // get spans for information
    let daySpan = document.getElementById("days");
    let distSpan = document.getElementById("dist");
    let dtgSpan = document.getElementById("dtg");
    let speedSpan = document.getElementById("speed");

    // get divs for progress bars
    let daysProg = document.getElementById("daysProg");
    let distanceProg = document.getElementById("distanceProg");
    let daysText = document.getElementById("dpt");
    let distanceText = document.getElementById("kmpt");

    // get paragraph for progress bar
    let final = document.getElementById("final");

    // get divs for detour points
    let ps = this.document.getElementById("ps");
    let sf = this.document.getElementById("sf");
    let la = this.document.getElementById("la");
    // show/hide label
    ps.addEventListener('mouseenter', showLabel);
    ps.addEventListener('mouseleave', hideLabel);
    sf.addEventListener('mouseenter', showLabel);
    sf.addEventListener('mouseleave', hideLabel);
    la.addEventListener('mouseenter', showLabel);
    la.addEventListener('mouseleave', hideLabel);

    // put points on map
    let s = sessionStorage.getItem("start");
    let sp = document.getElementById(s);
    sp.style.display = 'block'; // display point on map
    let e = sessionStorage.getItem("end");
    let ep = document.getElementById(e);
    ep.style.display = 'block'; // display point on map
    
    // set prog 
    setProgress();


    daySpan.innerHTML = sessionStorage.getItem('days');
    distSpan.innerHTML = sessionStorage.getItem('disTraveled');
    dtgSpan.innerHTML = Number(sessionStorage.getItem('distance')) - Number(sessionStorage.getItem('disTraveled'));
    speedSpan.innerHTML = sessionStorage.getItem('kmph');
    

    // show div by setting display = block
    function showLabel(e) {
        let labelDiv = document.getElementById(this.id+"Label");
        labelDiv.style.display = 'block';
    }

    // hide div by setting display = none
    function hideLabel(e) {
        let labelDiv = document.getElementById(this.id+"Label");
        labelDiv.style.display = 'none';
    }


    function migrateAnimation(p ,pChange) {
        let id = null;
        let end = p + pChange; // add the percentage traveled
        sessionStorage.setItem('progress', end); // set progress
        clearInterval(id);
        id=setInterval(frame, 25); // animation takes 25ms
        function frame() {
            if (p == end) { // check if reached the end
                clearInterval(id); 
            } else {
                p = p + 0.25; // 0.25% increase for each frame
                document.documentElement.style.setProperty('--distance', `${p}%`); // set --distance to new percent
            }
        }
    }

    function setProgress() {
        let days = sessionStorage.getItem("days"); // days traveled
        let distance = sessionStorage.getItem("disTraveled"); // distance traveled
        let totalDistance = Number(sessionStorage.getItem('distance')); // total journy distance
        let percentKMTraveled = Math.round(distance/totalDistance*100); // percent distance traveled
        let percentDaysTraveled = Math.round(days/90*100); // percent of 90 day journy made
        daysProg.style.width = percentDaysTraveled + "%"; // change width of prog bar
        daysProg.style.backgroundColor = hsl_col_perc(percentDaysTraveled, 100, 0); 
        distanceProg.style.width = percentKMTraveled + "%";
        distanceProg.style.backgroundColor = hsl_col_perc(percentKMTraveled, 0, 100);
        daysText.innerHTML = percentDaysTraveled + "%"; // change text to match progress
        distanceText.innerHTML = percentKMTraveled + "%";
        final.innerHTML = totalDistance + " KM"; // change end KM in case of route decisions
    }

    function hsl_col_perc(percent, start, end) { // from https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
        let a = percent / 100;
        let b = (end - start) * a;
        let c = b + start;
        // Return a CSS HSL string
        return 'hsl('+c+', 100%, 50%)';
      }



    function migrate() {
        // get days and miles traveled
        let days = Number(sessionStorage.getItem('days'));
        let totalTraveled = Number(sessionStorage.getItem('disTraveled'));
        let distance = Number(sessionStorage.getItem('distance'));
        let speed = Number(sessionStorage.getItem('kmph'));
        let routeDecided = Number(sessionStorage.getItem('routeDecided'));
        let puget = Number(sessionStorage.getItem('puget'));
        let san = Number(sessionStorage.getItem('san'));
        let los = Number(sessionStorage.getItem('los'));
        // check if journey is OVER
        if(totalTraveled >= distance && days <= 90) { // traveled the distance
            sessionStorage.setItem('outcome', 's'); // set outcome to success 
            window.location.replace('result.html');
        } else if (days >= 90) { // traveled more than 90 days
            sessionStorage.setItem('outcome', 'p'); // set outcome to pass
            window.location.replace('result.html');
        }
        // channel route decision 
        if (totalTraveled >= 8200 && routeDecided == 0) {
            sessionStorage.setItem('routeDecided', 1);
            window.location.replace('channel.html');
        }

        // FOR TESTING WHALE PATH
        speedSpan.innerHTML = sessionStorage.getItem('kmph');
        // add 4 days to journey time
        sessionStorage.setItem('days', days+4);
        daySpan.innerHTML = days+4;
        // calculate how many kms were traveled by speed * 4 * 24
        let kmTraveled = Number(sessionStorage.getItem('kmph'))*4*24;
        distSpan.innerHTML = Math.round(totalTraveled+kmTraveled);
        sessionStorage.setItem('disTraveled', totalTraveled+kmTraveled);
        dtgSpan.innerHTML = Math.round(Number(sessionStorage.getItem('distance')) - Number(sessionStorage.getItem('disTraveled')));
        // check success 
        if ((totalTraveled+kmTraveled) >= distance && days+4 <= 90) {
            sessionStorage.setItem('outcome', 's');
            window.location.replace('result.html');
        } else if (days+4 >= 90) {
            sessionStorage.setItem('outcome', 'p');
            window.location.replace('result.html');
        }
        
        // calculate percentage journeyed 
        let percentTraveled = Math.round(kmTraveled/distance*100);
        // call the migrate animation function with that percentage change 
        migrateAnimation(Number(sessionStorage.getItem('progress')), percentTraveled);
        // set progress bars 
        setProgress();

        // COMMENTED OUT FOR TESTING!!!!
        // let diceRoll = Math.random(); // roll for event
        // // events 
        // if (diceRoll < 0.10 && totalTraveled < 3000) { // storm  
        //     window.location.replace('storm.html');
        // } else if (diceRoll < 0.10 && totalTraveled >= 3000) { // killer whale
        //     window.location.replace('whaleEncounter.html');
        // } else if ((totalTraveled >= 3000 && totalTraveled < 4000) && (0.40 <= diceRoll && diceRoll < 0.50) && puget == 0) { // puget sound detour
        //     sessionStorage.setItem("puget", 1);
        //     let diceRoll = Math.random(); // roll for death
        //     if (diceRoll <= 0.1) { // 10% chance of death
        //         sessionStorage.setItem('outcome', 't'); // set outcome to tour death
        //         window.location.replace('result.html'); // go to results
        //     } else { // detour
        //     window.location.replace('pugetsound.html');
        //     }
        // } else if (diceRoll >= 0.10 && diceRoll < 0.15) { // feed along migration
        //     window.location.replace('feed2.html');
        // } else if (diceRoll >= 0.15 && diceRoll < 0.22) { // killer whale
        //     window.location.replace('whaleEncounter.html');
        // } else if ((totalTraveled >= 4000 && totalTraveled < 5000) && (0.40 <= diceRoll && diceRoll < 0.50) && san == 0) { // san fran detour
        //     sessionStorage.setItem("san", 1);
        //     let diceRoll = Math.random(); // roll for death
        //     if (diceRoll <= 0.1) { // 10% chance of death
        //         sessionStorage.setItem('outcome', 't'); // set outcome to tour death
        //         window.location.replace('result.html'); // go to results
        //     } else { // detour
        //     window.location.replace('sanfrancisco.html');
        //     }
        // } else if (totalTraveled > 5000 && (0.22 <= diceRoll && diceRoll < 0.30)) { // whale watchers
        //     window.location.replace('whaleWatchers.html');
        // } else if (totalTraveled <= 5000 && (0.22 <= diceRoll && diceRoll < 0.30)) { // fishing boats
        //     window.location.replace('boat.html');
        // } else if ((totalTraveled >= 5000 && totalTraveled <= 6000) && (0.40 <= diceRoll && diceRoll < 0.50) && los == 0) { // los angeles detour
        //     sessionStorage.setItem("los", 1);
        //     let diceRoll = Math.random(); // roll for death
        //     if (diceRoll <= 0.1) { // 10% chance of death
        //         sessionStorage.setItem('outcome', 't'); // set outcome to tour death
        //         window.location.replace('result.html'); // go to results
        //     } else { // detour
        //     window.location.replace('losangeles.html');
        //     }
        // } else if (totalTraveled <= 10000 && (0.30 <= diceRoll && diceRoll < 0.40)) { // frieghters and tankers
        //     window.location.replace('freightersTankers.html');
        // } else { // no event? SWIM
        //     speedSpan.innerHTML = sessionStorage.getItem('kmph');
        //     // add 4 days to journey time
        //     sessionStorage.setItem('days', days+4);
        //     daySpan.innerHTML = days+4;
        //     // calculate how many kms were traveled by speed * 4 * 24
        //     let kmTraveled = Number(sessionStorage.getItem('kmph'))*4*24;
        //     distSpan.innerHTML = Math.round(totalTraveled+kmTraveled);
        //     sessionStorage.setItem('disTraveled', totalTraveled+kmTraveled);
        //     dtgSpan.innerHTML = Math.round(Number(sessionStorage.getItem('distance')) - Number(sessionStorage.getItem('disTraveled')));
        //     // check success 
        //     if ((totalTraveled+kmTraveled) >= distance && days+4 <= 90) {
        //         sessionStorage.setItem('outcome', 's');
        //         window.location.replace('result.html');
        //     } else if (days+4 >= 90) {
        //         sessionStorage.setItem('outcome', 'p');
        //         window.location.replace('result.html');
        //     }
            
        //     // calculate percentage journeyed 
        //     let percentTraveled = Math.round(kmTraveled/distance*100);
        //     // call the migrate animation function with that percentage change 
        //     migrateAnimation(Number(sessionStorage.getItem('progress')), percentTraveled);
        //     // set progress bars 
        //     setProgress();
        // }
    }

    let contButton = document.getElementById('cs');
    contButton.addEventListener('click', migrate);

});