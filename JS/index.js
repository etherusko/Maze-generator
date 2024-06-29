import { canvas, btnReset, changeVel } from "./main.js";
const aspectRatio = canvas.width/canvas.height;
const rootStyles = document.documentElement.style
const btnGenerate = document.getElementById('btn-generate');
const radiobtns = document.querySelectorAll('label input');
const radioFast = radiobtns[0];
const radioSteps = radiobtns[1];
const speedRange = document.getElementById('speed-range');

//console.log(radioSteps.checked);

btnGenerate.addEventListener('click', () => btnReset(radioSteps.checked));
speedRange.addEventListener('input', () => changeVel(21-speedRange.value));
rootStyles.setProperty('--canvasAspectRatio',aspectRatio);  