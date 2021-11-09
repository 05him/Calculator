let calcBtn = document.querySelectorAll('.calc-no');
let backspaceBtn = document.querySelector('.backspace-btn');
let mainScreen = document.querySelector('.main-screen');
let lowerScreen = document.querySelector('.lower-screen');
let equalBtn = document.querySelector('.equal-btn');
let resetBtn = document.querySelector('.reset-btn');
let regx=/([+|*|÷|x|/|-])/;
let symbolOrder=["/","*","+","-"];

let i=0;
for(let btn of calcBtn){
    btn.addEventListener('click',addBtnToScreen);
}

backspaceBtn.addEventListener('click',backspaceEvent);
equalBtn.addEventListener('click',equalEvent);
resetBtn.addEventListener('click',resetEvent);
function addBtnToScreen(e){
    if(e.target.classList[1]==="calc-symbol"){
        if(mainScreen.value===""){mainScreen.value=mainScreen.value+"0"}
        else if(checkForSymbol()){ backspaceEvent(); }
    }
    else if (e.target.innerText==="."){
        if(mainScreen.value===""){mainScreen.value=mainScreen.value+"0"}
        else if (checkForDecimal()){return;}
        else if(checkForSymbol()){mainScreen.value=mainScreen.value+"0"}
    }
    mainScreen.value= mainScreen.value+e.target.innerText;
}
function backspaceEvent(){
    mainScreen.value=mainScreen.value.slice(0,mainScreen.value.length-1);
}
function checkForSymbol(){
    let temp=mainScreen.value.split("").pop()
    if(temp==="+"|| temp==="-"|| temp==="x" || temp==="÷" || temp==="."){   return true;  }
    else{return false;}
}
function checkForDecimal(){
    let temp=mainScreen.value.split(regx).pop();
    if(temp.includes(".")){return true;}
    else{return false;}
}
function equalEvent(){
    i=0;
    expression=mainScreen.value.replaceAll("x","*").replaceAll("÷","/");
    expression=expression.split(regx);
    if(checkForSymbol()){ expression.pop(); expression.pop()};
    console.log(expression);
    lowerScreen.value=bodmas();
}
function resetEvent(){
    mainScreen.value="";
    lowerScreen.value="";
    expression=0;
    i=0;
}
// console.log(expression);

// bodmas();
//```````````````````````bodmas function will calculate the given expression in order of BODMAS```````````````//
function bodmas(){
    while(expression.includes(symbolOrder[i])){
        let indexOfSymbol = expression.indexOf(symbolOrder[i]);
        preProcess(indexOfSymbol);
    }i++;

    while(expression.includes(symbolOrder[i])){
     let indexOfSymbol = expression.indexOf(symbolOrder[i]);
     preProcess(indexOfSymbol);
    }i++;

    expression=arrange(expression);

    while(expression.includes(symbolOrder[i])){
        let indexOfSymbol = expression.indexOf(symbolOrder[i]);
        preProcess(indexOfSymbol);
    }i++;

    while(expression.includes(symbolOrder[i])){
        let indexOfSymbol = expression.indexOf(symbolOrder[i])
        preProcess(indexOfSymbol);
    }
    return expression;
}

//``````````````````````preProcess function basically organise everything before calling the calculation function`````````````````//
function preProcess(indexOfSymbol){
    let a = expression.at(indexOfSymbol-1);
    let b = expression.at(indexOfSymbol+1);
    let symbol = expression.at(indexOfSymbol);
    let result = calculate(Number(a),symbol,Number(b));
    expression.splice(indexOfSymbol-1,3,result);
    console.log(expression);
}

//`````````````````````````function to do primary calculations```````````````````````````````//
function calculate(a,symbol,b){
         if(symbol==="/"){    return a/b; }
    else if(symbol==="*"){    return a*b; }
    else if(symbol==="+"){    return a+b; }
    else if(symbol==="-"){    return a-b; }
}

//`````````````````````````function to arrange positve and negative numbers```````````````````````//
function arrange(expression){
    console.log("arrange begins here");
    let negativeNumbers=[];

    while(expression.includes("-")){
        let indexOfSymbol = expression.indexOf("-");
        negativeNumbers.push(expression.at(indexOfSymbol),expression.at(indexOfSymbol+1));
        expression.splice(indexOfSymbol,2);
    }

    console.log("final negative Numbers=",negativeNumbers);
    console.log("final positive", expression);
    expression=expression.concat(negativeNumbers);
    console.log("modified expresson = ",expression);
    return expression;
}
