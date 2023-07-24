// GET UI
// input ui
let darkbtn = document.querySelector('.darkmode-btn');
let togglesecbtn = document.querySelector('.toggle-section');

let inputcontainer = document.querySelector('.input-container');
let testingcontainer = document.querySelector('.testing-container');
let titlesec = document.querySelector('.title-sec');

let forpluscon = document.querySelector('.forplus');
let formultiplycon = document.querySelector('.formultiply');

// for plsu input
let levelinput = document.getElementById('level');
let limitinput = document.getElementById('limit');
let digsinput = document.getElementById('digs');
let minusinput = document.getElementById('minus');

let leverr = document.querySelector('.leverr');
let leverr2 = document.querySelector('.leverr2');
let digserr = document.querySelector('.digserr');
// for plsu input


// for multiply input
let multilevelinput = document.getElementById('multilevel');
let multidigsinput = document.getElementById('multidigs');

let mleverr = document.querySelector('.multileverr');
let mleverr2 = document.querySelector('.multileverr2');
let mdigserr = document.querySelector('.multidigserr');
// for multiply input


let startplusbtn = document.querySelector('.plus');
let startmultibtn = document.querySelector('.multi');
// input ui


// testing ui
let teslevui = document.getElementById('lev');
let tesbylevui = document.getElementById('bylev');
let teslevels = document.getElementById('levels');

let testimes = document.getElementById('times');

let plusquescont = document.querySelector('.plus-ques');
let multiquescont = document.querySelector('.multi-ques');

let plusques = document.querySelector('.plusque');
let ansinput = document.getElementById('ans');

let pbackbtn = document.querySelector('.pback-btn');
let pnextbtn = document.querySelector('.pans-btn');


let mtnumui = document.querySelector('.mtnum');
let multiplierui = document.querySelector('.multiplier');
let multiansinput = document.getElementById('multians');

let mbackbtn = document.querySelector('.mback-btn');
let mnextbtn = document.querySelector('.mans-btn');
// testing ui


// win&lose ui
let scorebox = document.querySelector('.blur');

let awardui = document.querySelector('.award');

// let scoreui = document.getElementById('score');
let inclist = document.querySelector('.inc-list');

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
var stepplus = 0;

var curlevel = 1;
var curidx = 0;

var ques = [];
var anses = [];
var coranses = [];

var uncorlevels = [];

var correctques = 0;
// var score = 5;


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

var sectionfix = JSON.parse(localStorage.getItem('section'));

if(sectionfix == "multiply"){
    forpluscon.classList.toggle("d-none");
    formultiplycon.classList.toggle("d-none");

    plusquescont.classList.toggle("d-none");
    multiquescont.classList.toggle("d-none");

    togglesecbtn.classList.toggle("active");

    localStorage.setItem('section',JSON.stringify("addition"));
}

togglesecbtn.addEventListener('click',function(){
    forpluscon.classList.toggle("d-none");
    formultiplycon.classList.toggle("d-none");

    plusquescont.classList.toggle("d-none");
    multiquescont.classList.toggle("d-none");

    if(!forpluscon.classList.contains("d-none")){
        levelinput.focus();
    }

    if(!formultiplycon.classList.contains("d-none")){
        multilevelinput.focus();
    }
    
    this.classList.toggle("active");

    if(this.classList.contains("active")){
        this.innerText = "Addition";
        titlesec.innerText = "( multiply )";
        testingcontainer.classList.add("multipling");
    }else{
        this.innerText = "Multiply";
        titlesec.innerText = "( addition )";
        testingcontainer.classList.remove("multipling");
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

multilevelinput.addEventListener('keyup',function(){
    mleverr.classList.add('d-none');
    mleverr2.classList.add('d-none');
})

multidigsinput.addEventListener('keyup',function(){
    mdigserr.classList.add('d-none')
})


startplusbtn.addEventListener('click',function(){
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
            starttrainplus();
            darkbtn.classList.add("d-none");
        }else{
            leverr2.classList.remove('d-none');
        }
    }else{
        levelin == '' ? leverr.classList.remove('d-none') : leverr.classList.add('d-none');
        digsin == '' ? digserr.classList.remove('d-none') : digserr.classList.add('d-none');
    }

    localStorage.setItem('section',JSON.stringify("addition"));

})

startmultibtn.addEventListener('click',function(){
    let levelin = +multilevelinput.value;
    let digsin = +multidigsinput.value;

    if(levelin != '' && digsin != ''){
        if(levelin >= level){
            level = +levelin;
            digits = +digsin;
            starttrainmulti();
            darkbtn.classList.add("d-none");
        }else{
            mleverr2.classList.remove('d-none');
        }
    }else{
        levelin == '' ? mleverr.classList.remove('d-none') : mleverr.classList.add('d-none');
        digsin == '' ? mdigserr.classList.remove('d-none') : mdigserr.classList.add('d-none');
    }

    localStorage.setItem('section',JSON.stringify("multiply"));
})

startagainbtn.addEventListener('click',function(){
    window.location.reload();
})


function starttrainplus(){
    // console.log(levs);
    inputcontainer.classList.add('d-none');
    testingcontainer.classList.remove('d-none');

    ansinput.focus();

    teslevui.innerText = curlevel;
    tesbylevui.innerText = curlevel;
    teslevels.innerText = level;

    // console.log(level/3);
    var timebylev = Math.floor(level/3);
    stepplus = (3 / timebylev).toFixed(2);

    // console.log(+stepplus);

    newquesplusfun();
    timeinter = setInterval(timefun,1000);
}

function starttrainmulti(){
    inputcontainer.classList.add('d-none');
    testingcontainer.classList.remove('d-none');

    multiansinput.focus();

    teslevui.innerText = curlevel;
    tesbylevui.innerText = curlevel;
    teslevels.innerText = level;

    newquesmultifun();
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


var step = 6;
var countre = 0;

pnextbtn.addEventListener('click',function(e){
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
                scorefun(anses[curidx],coranses[curidx]);
                curidx += 1;
                step += +stepplus;
                if(step == 9){
                    step += 3;
                }else{
                    if(step == 15){
                        step += 3;
                    }
                }
                newquesplusfun();
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
                this.classList.add("active");
            }

            htmlquesplus(ques);
        }else{
            clearInterval(timeinter);
            this.parentElement.parentElement.remove();
            scorebox.classList.remove('d-none');
            anses.push(ansinput.value);
            scorefun(anses[curidx],coranses[curidx]);
        }
        
        // console.log(ques);
        // console.log(anses);
    }else{
        ansinput.focus();
    }
})

pbackbtn.addEventListener('click',function(e){
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

    htmlquesplus(ques);
})

mnextbtn.addEventListener('click',function(e){
    e.preventDefault();

    if(multiansinput.value.trim() != ''){
        this.parentElement.classList.add("backactive");

        if(curlevel < level){

            if(anses.indexOf(anses[curidx]) == -1){
                anses.push(multiansinput.value);
                multiansinput.value = '';
                scorefun(anses[curidx],coranses[curidx]);
                curidx += 1;
                newquesmultifun();
            }else{
                anses[curidx] = multiansinput.value;
                curidx += 1;
                if(anses.indexOf(anses[curidx]) != -1){
                    multiansinput.value = anses[curidx];
                }else{
                    multiansinput.value = '';
                }
            }

            multiansinput.focus();

            curlevel++;

            if(curlevel == level){
                this.innerText = "Submit";
                this.classList.add("active");
            }

            htmlquesmulti(ques);
        }else{
            clearInterval(timeinter);
            this.parentElement.parentElement.remove();
            scorebox.classList.remove('d-none');
            anses.push(multiansinput.value);
            scorefun(anses[curidx],coranses[curidx]);
        }

    }else{
        multiansinput.focus();
    }
})

mbackbtn.addEventListener('click',function(e){
    e.preventDefault();

    curlevel -= 1;
    curidx -= 1;

    if(curidx == 0){
        this.parentElement.classList.remove('backactive');
    }

    multiansinput.value = anses[curidx];
    multiansinput.focus();

    htmlquesmulti(ques);
})

function newquesplusfun(){
    var ranque = [];
    var corans = 0;
    countre = 0;

    var l=0;
    // console.log(Math.round(step));
    // console.log(step);
    while(l <= step){
        var rannum = randomnumfun(digits);
        // console.log(rannum);

        if(minusinput.checked){
            // console.log(step);
            if(step == 6){
                rannum *= Math.sign(rannum) == -1 ? -1 : 1;
            }else{
                if(l >= (step-1) || l >= (step-2)){
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

        if(countre >= limit){
            l += 30;
        }else{
            l += 3;
        }
    }
    // console.log(countre);

    ques.push(ranque);
    // console.log(ques);
    coranses.push(corans);
    // console.log(coranses)

    htmlquesplus(ques);
}

function newquesmultifun(){
    let ranque = {
        mtnum: randomnumfun(digits),
        multiplier: randomnumfun(1)
    };
    // console.log(ranque.mtnum * ranque.multiplier);
    console.log(ranque.multiplier);
    console.log(ranque.mtnum);
    if(ranque.mtnum == 1){
        ranque.mtnum = ranque.mtnum + randomnumfun(digits);
    }

    if(ranque.multiplier == 1){
        ranque.multiplier = ranque.multiplier + randomnumfun(1);
    }

    let corans = ranque.mtnum * ranque.multiplier;

    ques.push(ranque);
    // console.log(ques);
    coranses.push(corans);

    htmlquesmulti(ques);
}


function htmlquesplus(que){
    plusques.innerHTML = '';
    
    // console.log(ques);
    let curque = que[curidx];
    // console.log(curque);

    for(var q=0; q < curque.length; q++){
        var newli = document.createElement('li');
        newli.innerText = curque[q];
        plusques.append(newli);
    }
    teslevui.innerText = curlevel;
    tesbylevui.innerText = curlevel;
}

function htmlquesmulti(que){
    mtnumui.innerText = '';
    multiplierui.innerText = '';

    let curque = que[curidx];

    mtnumui.innerText = curque.mtnum;
    multiplierui.innerText = curque.multiplier;
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


function scorefun(userans,corans){
    // console.log(userans);
    // console.log(corans);
    // console.log(anses);
    // console.log(coranses);
    // console.log(ques);

    // console.log(anses[curidx-1]);
    // console.log(coranses[curidx-1]);

    historylist.innerHTML = '';

    var ansuser = +userans;
    var anscor = +corans;
    // var quecur = curque;
    // console.log(quecur.length);
    // score += (+quecur.length * 2);

    if(ansuser == anscor){
        correctques++;
    }else{
        uncorlevels.push(curidx);
    }
    // console.log(uncorlevels);

    uncorlevels.forEach(uncorlevel=>{
        // console.log(coranses[uncorlevel]);
        // console.log(anses);
        // console.log(anses[uncorlevel]);

        var unans = anses[uncorlevel];
        var coans = coranses[uncorlevel];
        var unqus = '';
        // console.log(multiquescont.classList.contains('d-none'));

        if(multiquescont.classList.contains('d-none')){
            unqus = ques[uncorlevel].join(' ');
        }else{
            unqus = `${ques[uncorlevel].mtnum} x ${ques[uncorlevel].multiplier}`;
        }

        
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

    // awardui.innerText = "HELLO";

    if(correctques == level){
        awardui.innerText = "Perfect";
        awardui.className = "award perfect";
        inclist.classList.add('d-none');
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

    // scoreui.innerText = score;
    curtimeui.innerText = curtime;
    correctansui.innerText = correctques;
    totalqesui.innerText = level;

}

// start input section



