// GET UI
// input ui
let darkbtn = document.querySelector('.darkmode-btn');

let inputcontainer = document.querySelector('.input-container');
let testingcontainer = document.querySelector('.testing-container');

let levelinput = document.getElementById('level');
let limitinput = document.getElementById('limit');
let digsinput = document.getElementById('digs');
let minusinput = document.getElementById('minus');

let leverr = document.querySelector('.leverr');
let leverr2 = document.querySelector('.leverr2');
let digserr = document.querySelector('.digserr');

let startbtn = document.querySelector('.submit-btn');
// input ui


// testing ui
let teslevui = document.getElementById('lev');
let tesbylevui = document.getElementById('bylev');
let teslevels = document.getElementById('levels');

let testimes = document.getElementById('times');

let quescontainer = document.querySelector('.ques-container');

let ansinput = document.getElementById('ans');

let backbtn = document.querySelector('.back-btn');
let nextbtn = document.querySelector('.ans-btn');
// testing ui


// win&lose ui
let scorebox = document.querySelector('.blur');

let awardui = document.querySelector('.award');

let scoreui = document.getElementById('score');
let correctansui = document.getElementById('correctans');
let totalqesui = document.getElementById('totalqes');
let curtimeui = document.getElementById('curtime');

let startagainbtn = document.querySelector('.again-btn');

let historylist = document.querySelector('.history-list');

// win&lose ui
// GET UI


// start input section

var level = 5;
var digits = 1;
var limit = 10;

var curlevel = 1;
var curidx = 0;

var ques = [];
var anses = [];
var coranses = [];

var uncorlevels = [];

var correctques = 0;
var score = 5;


var mivals = [];

var minusvalues = [];
var plusvalues = [];

let getdarkmodeal = JSON.parse(localStorage.getItem('darkmode'));

if(getdarkmodeal == 1){
    darkbtn.parentElement.classList.toggle('dark');
}

darkbtn.addEventListener('click',function(){
    this.parentElement.classList.toggle("dark");
    
    // console.log(this.parentElement.classList.contains("dark"))
    if(this.parentElement.classList.contains("dark")){
        localStorage.setItem('darkmode',JSON.stringify(1));
    }else{
        localStorage.setItem('darkmode',JSON.stringify(0));
    }

})


levelinput.focus();
levelinput.addEventListener('keyup',function(){
    leverr.classList.add('d-none');
    leverr2.classList.add('d-none');
})

digsinput.addEventListener('keyup',function(){
    digserr.classList.add('d-none');
})

startbtn.addEventListener('click',function(){
    let levelin = levelinput.value;
    let digsin = digsinput.value;
    let limitin = limitinput.value;
    // console.log(minusinput.checked);
    // console.log(digsin);

    if(levelin != '' && digsin != ''){
        if(levelin >= level){
            level = +levelin;
            digits = +digsin;
            limit = +limitin;
            starttrain();
        }else{
            leverr2.classList.remove('d-none');
        }
    }else{
        levelin == '' ? leverr.classList.remove('d-none') : leverr.classList.add('d-none');
        digsin == '' ? digserr.classList.remove('d-none') : digserr.classList.add('d-none');
    }

})


startagainbtn.addEventListener('click',function(){
    window.location.reload();
})


function starttrain(){
    // console.log(levs);

    inputcontainer.classList.add('d-none');
    testingcontainer.classList.remove('d-none');

    ansinput.focus();

    teslevui.innerText = curlevel;
    tesbylevui.innerText = curlevel;
    teslevels.innerText = level;


    newquesfun();
    timeinter = setInterval(timefun,1000);

}

// time section
var timeinter;

var min = 0;
var sec = 0;
function timefun(){
    sec++;
    sec = sec < 10 ? '0'+sec : sec;
    
    if(sec == 60){
        sec = 0;
        sec = sec < 10 ? '0'+sec : sec;

        min++;
        min = min < 10 ? '0'+min : min;
    }

    if(min == 0){
        testimes.innerText = `00:${sec}`;
    }else{
        testimes.innerText = `${min}:${sec}`;
    }
}
// time section


var step = 7;

nextbtn.addEventListener('click',function(e){
    e.preventDefault();

    if(ansinput.value.trim() != ''){
        mivals = [];
        minusvalues = [];
        plusvalues = [];

        this.parentElement.classList.add('backactive');
        
        if(curlevel < level){
            // console.log(anses.indexOf(anses[curidx]));
            // console.log(anses[curidx]);
            if(anses.indexOf(anses[curidx]) == -1){
                // console.log("no data");
                anses.push(ansinput.value);
                ansinput.value = '';
                scorefun();
                curidx += 1;
                // console.log(anses);
                step += 1;
                newquesfun();
            }else{
                // console.log("data");
                // console.log(anses[curidx]);
                // console.log(ansinput.value);
                anses[curidx] = ansinput.value;
                curidx += 1;
                if(anses.indexOf(anses[curidx]) != -1){
                    ansinput.value = anses[curidx];
                }else{
                    ansinput.value = '';
                }
                // console.log(anses);
            }
            ansinput.focus();
            // console.log(anses[curidx]);
            
            curlevel += 1;

            if(curlevel == level){
                this.innerText = "Submit";
            }

            htmlques(ques);
        }else{
            clearInterval(timeinter);
            this.parentElement.parentElement.remove();
            scorebox.classList.remove('d-none');
            anses.push(ansinput.value);
            scorefun();
        }
        
        // console.log(ques);
        // console.log(anses);
    }else{
        ansinput.focus();
    }
})

backbtn.addEventListener('click',function(e){
    e.preventDefault();

    // console.log(anses);

    curlevel -= 1;
    curidx -= 1;

    // console.log(curidx);
    // console.log(anses);

    if(curidx == 0){
        this.parentElement.classList.remove('backactive');
    }

    ansinput.value = anses[curidx];
    ansinput.focus();

    htmlques(ques);
})


function newquesfun(){
    var ranque = [];
    var corans = 0;
    var countre = 1;

    var l=0;
    while(l < step){
        var rannum = randomnumfun(digits);
        // console.log(rannum);

        if(minusinput.checked){
            console.log(step);
            if(step == 5){
                rannum *= Math.sign(rannum) == -1 ? -1 : 1;
            }else{
                if(l == (step-1) || l == (step-2)){
                    // console.log(minusvalues);
                    if(minusvalues.length == 0){
                        rannum *= Math.sign(rannum) == 1 ? -1 : 1;
                    }
                }
            }
        }

        ranque.push(rannum);
        corans += rannum;

        // console.log(step);
        // console.log("+++++ "+countre);
        countre += 1;

        if(countre > limit){
            l += 30;
        }else{
            l += 2;
        }
    }

    ques.push(ranque);
    // console.log(ques);
    coranses.push(corans);
    // console.log(coranses)

    htmlques(ques);
}


function htmlques(que){
    quescontainer.innerHTML = '';
    
    // console.log(ques);
    let curque = que[curidx];
    // console.log(curque);

    for(var q=0; q < curque.length; q++){

        var newli = document.createElement('li');
        newli.innerText = curque[q];

        quescontainer.append(newli);
    }
    teslevui.innerText = curlevel;
    tesbylevui.innerText = curlevel;
}

function randomnumfun(digits){
    var minnum = 1;
    var maxnum = 1;

    for(var n=0; n < +digits - 1; n++){
        minnum *= 10;
    }

    for(var m=0; m < +digits; m++){
        maxnum *= 10;
    }

    
    var rannum = 0;
    if(minusinput.checked){

        var minminus = (maxnum * -1) + 1;
        rannum = Math.floor(minminus + (Math.random() * ((maxnum - 1) - minminus)));

        if(rannum == 0){
            rannum += Math.floor((Math.random() * 5) + 1);
        }

        mivals.push(Math.sign(rannum));
        minusvalues = mivals.filter(m => m == -1);
        plusvalues = mivals.filter(p => p == 1);

        if(mivals.length > 1){
            // console.log(">>>>>> " + mivals);
            // console.log("------ " + minusvalues);
            // console.log(rannum);
            if(minusvalues.length > plusvalues.length){
                rannum *= Math.sign(rannum) == -1 ? -1 : 1;
            }
            // console.log(rannum);
        }

        // console.log(rannum);
        // console.warn(' ');

        // if(digits != 1){
        //     if(rannum < minnum && rannum > 0){
        //         rannum += minnum;
        //     }else if(rannum > (minnum * -1) && rannum < 0){
        //         rannum -= minnum;
        //     }
        // }

    }else{
        rannum = Math.floor(minnum + Math.random() * ((maxnum - 1) - minnum));
    }

    if(rannum == 0){
        rannum += Math.floor((Math.random() * 5) + 1);
    }

    return rannum;
}


function scorefun(){
    // console.log(anses);
    // console.log(coranses);
    // console.log(ques);

    // console.log(anses[curidx-1]);
    // console.log(coranses[curidx-1]);

    historylist.innerHTML = '';


    var ansuser = +anses[curidx];
    var anscor = coranses[curidx];
    var quecor = ques[curidx];
    // console.log(quecor.length);
    score += (+quecor.length * 2);

    if(ansuser == anscor){
        correctques++;
    }else{
        uncorlevels.push(curidx);
    }
    // console.log(uncorlevels);

    uncorlevels.forEach(uncorlevel=>{
        // console.log(coranses[uncorlevel]);
        // console.log(anses[uncorlevel]);

        var unans = anses[uncorlevel];
        var coans = coranses[uncorlevel];
        var unqus = ques[uncorlevel].join(' ');
        // console.log(unqus);

        // <li class="his-item">
        //     <p><span>level - 1</span> <span>Ans - 100</span></p>
        //     <p><span>10+20</span> <span>150</span></p>
        // </li>

        var hisli = document.createElement('li');
        hisli.className = 'his-item';

        hisli.innerHTML = `
            <p><span>level - ${uncorlevel+1}</span> <span>Yours - ${unans}</span></p>
            <p><span>${unqus}</span> <span>Ans - ${coans}</span></p>
        `;
        
        historylist.append(hisli);

    })

    // console.log(correctques);

    // console.log(awardui.innerText);
    // console.log(correctques);
    // console.log(level/3);

    awardui.innerText = "HELLO";

    if(correctques == level){
        awardui.innerText = "Perfect";
        awardui.className = "award perfect";
    }else if(correctques > (level/1.5)){
        awardui.innerText = "Great";
        awardui.className = "award great";
    }else if(correctques > (level/2)){
        awardui.innerText = "Good";
        awardui.className = "award good";
    }else if(correctques > (level/3)){
        awardui.innerText = "Bad";
        awardui.className = "award bad";
    }else{
        awardui.innerText = "Very Bad";
        awardui.className = "award bad";
        score = 0;
    }

    let testimes = document.getElementById('times');
    var curtime = testimes.innerText;

    scoreui.innerText = score;
    curtimeui.innerText = curtime;
    correctansui.innerText = correctques;
    totalqesui.innerText = level;

}

// start input section



