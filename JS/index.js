import { canvas, btnReset } from "./main.js";
const aspectRatio = canvas.width/canvas.height;
const rootStyles = document.documentElement.style
const btnGenerate = document.getElementById('btn-generate');

btnGenerate.addEventListener('click', btnReset)
rootStyles.setProperty('--canvasAspectRatio',aspectRatio);
