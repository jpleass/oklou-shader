import { BackgroundCanvas } from "./BackgroundCanvas";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.backgroundColor = "black";
const backgroundCanvas = new BackgroundCanvas(canvas);
backgroundCanvas.tick(0);

// console log when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");
});
