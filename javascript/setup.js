window.addEventListener('load', function (){
    // get the buttons
    let start = document.getElementById("start");
    let speed = document.getElementById("speed");
    let dest = document.getElementById("dest");
    let begin = document.getElementById("begin");
    // map to hold distances for calculations
    let startdist = new Map([['siberian', 50], ['chukchi',0], ['barrow',100]]);
    let enddist = new Map([['guerrero',0], ['scammon',50], ['ignacio',100], ['magdalena',175], ['vavaros',250]]);
    // map to hold extended names of places 
    let names = new Map([['siberian', 'Siberian Coast'], ['chukchi','Chukchi Sea'], ['barrow','Point Barrow'], ['guerrero','Guerro Negro Lagoon'], ['scammon','Scammon\'s Lagoon'], ['ignacio','San Ignacio Lagoon'], ['magdalena','Magdalena Bay'], ['vavaros','Vavaros, Sonora']])

    if (sessionStorage.getItem("start") != null) { // start point has been selected
        let s = sessionStorage.getItem("start");
        start.innerHTML = "Start: " + names.get(s); // display extended name
        let point = document.getElementById(s);
        point.style.display = 'block'; // display point on map
    }

    if (sessionStorage.getItem("kmph") != null) {
        speed.innerHTML = "Speed: " + sessionStorage.getItem("kmph") + " KMPH";
    }

    if (sessionStorage.getItem("end") != null) { // end point has been selected
        let e = sessionStorage.getItem("end");
        dest.innerHTML = "End: " + names.get(e); // display extended name
        let point = document.getElementById(e);
        point.style.display = 'block'; // display point on map
    }

    begin.addEventListener("click", beginGame);

    function beginGame(e) {
        // check if all categories have been selected
        if (sessionStorage.getItem('start') != null && sessionStorage.getItem('kmph') != null && sessionStorage.getItem('end') != null) {
            if (Number(sessionStorage.getItem('kmphCorrect')) == 0) {
                alert("KMPH is not correct!\nGo back and check your math!");
            } else {
                sessionStorage.setItem("days", 0); // days traveled
                sessionStorage.setItem("progress", 0); // percentage of the journey traveled
                sessionStorage.setItem("disTraveled", 0); // km traveled
                sessionStorage.setItem("routeDecided", 0); // route decision flag
                let start = sessionStorage.getItem('start');
                let dest = sessionStorage.getItem('end');
                sessionStorage.setItem("distance", 11000 + startdist.get(start) + enddist.get(dest)); // calculate distance between start and end
                window.location.replace('feed.html'); // start journey
            }
        } else {
            alert("WOAH THERE BUDDY CALM DOWN!\nYou have to set all the variables for your migration before you can start.\nNow try again when you're ready.");
        }
        
    }
});