window.addEventListener("load", function() {
    // finish button
    let finish = document.getElementById('fin');
    // get button spans 
    let fSpan = document.getElementById('fSpan');
    let cs = document.getElementById('cs');
    // get days lost span
    let dl = document.getElementById('dayslost');
    // choices
    let choices = new Map([["a", false],["b", false],["c", false]]);
    // choice flags
    let flags = new Map([["a", false],["b", false],["c", false]]);
    // questions 
    let questions = new Map([["ac", null],["aw", null],["bc", null],
                            ["bw", null],["cc", null],["cw", null]]);

    let qLables = new Map([["acl", null],["awl", null],["bcl", null],
                            ["bwl", null],["ccl", null],["cwl", null]]);
    // question divs
    let questionDivs = new Map([["aFirst", document.getElementById("afirst")],
                            ["bFirst", document.getElementById("bfirst")],
                            ["cFirst", document.getElementById("cfirst")],
                            ["aSecond", document.getElementById("asecond")],
                            ["bSecond", document.getElementById("bsecond")],
                            ["cSecond", document.getElementById("csecond")],]);

    // shuffle question answers
    let qs = ['a', 'b', 'c']; // list of questions
    for (i=0; i<3; i++) { // iterate through questions
        let q = qs[i]; // current question
        let order = Math.floor(Math.random() * 2) + 1;
        if (order == 1) { // correct answer first
            questionDivs.get(q+'First').style.display = 'block';
            questions.set(q+'c', document.getElementById(q+'1c'));
            questions.set(q+'w', document.getElementById(q+'1w'));
            qLables.set(q+'cl', document.getElementById(q+'1clabel'));
            qLables.set(q+'wl', document.getElementById(q+'1wlabel'));
        } else { // wrong answer first
            questionDivs.get(q+'Second').style.display = 'block';
            questions.set(q+'c', document.getElementById(q+'2c'));
            questions.set(q+'w', document.getElementById(q+'2w'));
            qLables.set(q+'cl', document.getElementById(q+'2clabel'));
            qLables.set(q+'wl', document.getElementById(q+'2wlabel'));
        }
        questions.get(q+'c').addEventListener("click", choice);
        questions.get(q+'w').addEventListener("click", choice);
    }


    // finish button
    finish.addEventListener("click", function() {
        let days = Number(sessionStorage.getItem("days"));
        if(flags.get('a') && flags.get('b') && flags.get('c')) { // make sure all choices have been made
            let penalty = 0;
            if(choices.get('a')) { // got a wrong
                penalty += 1;
                qLables.get('awl').style.color = 'red';
            }
            if(choices.get('b')) { // got b wrong
                penalty += 1;
                qLables.get('bwl').style.color = 'red';
            }
            if(choices.get('c')) { // got c wrong
                penalty += 1;
                qLables.get('cwl').style.color = 'red';
            }
            sessionStorage.setItem("days", days+penalty); // add penatly to days traveled
            fSpan.style.display = 'none';
            dl.innerHTML = penalty;
            cs.style.display = 'block';
        } else { // user still has choice to make
            alert("FINISH MAKING CHOICES");
        }
    });

    // Event listener
    function choice() {
        let prefix = this.id.charAt(0);
        let answer = this.id.charAt(2);
        let correct = qLables.get(prefix+'cl');
        let wrong = qLables.get(prefix+'wl');
        if(answer == 'c') {
            correct.style.color = "green";
            wrong.style.color = "black";
            choices.set(prefix, false);
        } else {
            correct.style.color = "black";
            wrong.style.color = "green";
            choices.set(prefix, true);
        }
        flags.set(prefix, true);
    }

});