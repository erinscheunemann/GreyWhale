window.addEventListener("load", function() {
    // finish button
    let finish = document.getElementById('fin');
    // get button spans 
    let fSpan = document.getElementById('fSpan');
    let cs = document.getElementById('cs');
    // choices
    let choices = new Map([["a", false],["b", false],["c", false]]);
    // choice flags
    let flags = new Map([["a", false],["b", false],["c", false]]);
    // questions 
    let questions = new Map([["ac", null],["aw", null],["bc", null],
                            ["bw", null],["cc", null],["cw", null],]);
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
        } else { // wrong answer first
            questionDivs.get(q+'Second').style.display = 'block';
            questions.set(q+'c', document.getElementById(q+'2c'));
            questions.set(q+'w', document.getElementById(q+'2w'));
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
                questions.get('aw').style.color = 'red';
            }
            if(choices.get('b')) { // got b wrong
                penalty += 1;
                questions.get('bw').style.color = 'red';
            }
            if(choices.get('c')) { // got c wrong
                penalty += 1;
                questions.get('cw').style.color = 'red';
            }
            sessionStorage.setItem("days", days+penalty); // add penatly to days traveled
            fSpan.style.display = 'none';
            cs.style.display = 'block';
            // window.location.replace("swim.html");
        } else { // user still has choice to make
            alert("FINISH MAKING CHOICES");
        }
    });

    // Event listener
    function choice() {
        let prefix = this.id.charAt(0);
        let answer = this.id.charAt(2);
        let correct = questions.get(prefix+'c');
        let wrong = questions.get(prefix+'w');
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