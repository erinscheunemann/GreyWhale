window.addEventListener('load', function (){
    // get eating button
    let btn = document.getElementById('eat');


    btn.addEventListener('click', function () {
        // amount speed increases by
        let increase = 0.5;
        let incText = "";
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
        }
        sessionStorage.setItem('days', days+4);
        sessionStorage.setItem('kmph', speed+increase);
        sessionStorage.setItem('kmphIncrease', kmphIncrease+increase);
    });
});