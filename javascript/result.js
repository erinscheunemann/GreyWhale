window.addEventListener('load', function() {
    // get divs
    let success = document.getElementById('success');
    let pass = document.getElementById('pass');
    let death = document.getElementById('death');
    let netDeath = document.getElementById('netDeath');
    let boatDeath = document.getElementById('boatDeath');
    let tourDeath = document.getElementById('tourDeath');
    // get buttons
    let restart = document.getElementById('restart');
    let quit = document.getElementById('quit');

    // set what div is displayed 
    // do when logic for success is done on swimming 
    let outcome = sessionStorage.getItem('outcome');
    switch (outcome) {
        case 's': // success
            success.style.display = 'block';
            break;
        case 'p': // pass
            pass.style.display = 'block';
            break;
        case 'd': // death by killer whale
            death.style.display = 'block';
            break;
        case 'n': // death by net
            netDeath.style.display = 'block';
            break;
        case 'b': // death by ship strike
            boatDeath.style.display = 'block';
            break;
        case 't': // death durring de(t)our
            tourDeath.style.display = 'block';
        default:
            break; 
    }

    // restart game
    restart.addEventListener('click', function() {
        sessionStorage.clear(); // clear all for a clean slate
    });

    // quit game 
    quit.addEventListener('click', function() {
        // reroute to index of FORSEA.ORG
    });
});