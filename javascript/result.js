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
    let keep = document.getElementById('keep');
    let clear = document.getElementById('clear');
    // get first and second choice divs
    let first = document.getElementById('firstChoice');
    let second = document.getElementById('secondChoice');

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
        first.style.display = 'none';
        second.style.display = 'block';
    });

    clear.addEventListener('click', function() {
        sessionStorage.clear(); // clear all for a clean slate
    });

    keep.addEventListener('click', function() {
        let kmph = sessionStorage.getItem('ogKMPH');
        let start = sessionStorage.getItem('start');
        let end = sessionStorage.getItem('end');
        let f = sessionStorage.getItem("first");
        let s = sessionStorage.getItem("second");
        let t = sessionStorage.getItem("third");
        sessionStorage.clear(); // clear all for a clean slate
        // reset starting items
        sessionStorage.setItem('kmph', kmph);
        sessionStorage.setItem('start', start);
        sessionStorage.setItem('end', end);
        sessionStorage.setItem('first', f);
        sessionStorage.setItem('second', s);
        sessionStorage.setItem('third', t);
        sessionStorage.setItem('kmphCorrect', 1); // store correctness
    });

    // quit game 
    quit.addEventListener('click', function() {
        // reroute to index of FORSEA.ORG
    });
});