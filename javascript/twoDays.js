window.addEventListener('load', function() {
    // get swim button
    let btn = document.getElementById('cs');
    // get days
    let days = Number(sessionStorage.getItem('days'));

    btn.addEventListener('click', function() {
        sessionStorage.setItem('days', days+2); // add two days to total days traveled 
    });
});