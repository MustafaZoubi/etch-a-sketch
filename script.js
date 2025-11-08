const container = document.querySelector(".container")
const body = document.querySelector("body");
const slider = document.querySelector("#slider")
slider.addEventListener("input", () => { generateCanvas("#ffffff"); })

generateCanvas("#ffffff");

let isMouseDown = false;
document.body.addEventListener("mousedown", (e) => { isMouseDown = true; });
document.body.addEventListener("mouseup", (e) => { isMouseDown = false; });
body.addEventListener("contextmenu", (e) => { e.preventDefault() });

let color = "#67A0C1";
const penPicker = document.querySelector("#pen-colorpicker");
penPicker.addEventListener("input", () => { color = penPicker.value; });
const backPicker = document.querySelector("#back-colorpicker");
backPicker.addEventListener("input", () => { generateCanvas(backPicker.value) });

let isPen = true;
let isEraser = false;
let isFill = false;
let isRainbow = false;
let isDark = false


const pen = document.querySelector(".pen");
pen.addEventListener("click", () => {
    isPen = true;
    isEraser = false;
    isFill = false;
    isRainbow = false;
    isDark = false;

    pen.style.boxShadow = "0 0 10px 3px #0aa5ffff";
    eraser.style.boxShadow = "0 0 10px 3px #67A0C1";
    fill.style.boxShadow = "0 0 10px 3px #67A0C1";
    rainbow.style.boxShadow = "0 0 10px 3px #67A0C1";
    darken.style.boxShadow = "0 0 10px 3px #67A0C1";


});

const eraser = document.querySelector(".eraser");
eraser.addEventListener("click", () => {
    isPen = false;
    isEraser = true;
    isFill = false;
    isRainbow = false;
    isDark = false;

    pen.style.boxShadow = "0 0 10px 3px #67A0C1";
    eraser.style.boxShadow = "0 0 10px 3px #0aa5ffff";
    fill.style.boxShadow = "0 0 10px 3px #67A0C1";
    rainbow.style.boxShadow = "0 0 10px 3px #67A0C1";
    darken.style.boxShadow = "0 0 10px 3px #67A0C1";


});

const fill = document.querySelector(".fill");
fill.addEventListener("click", () => {
    isPen = false;
    isEraser = false;
    isFill = true;
    isRainbow = false;
    isDark = false;

    pen.style.boxShadow = "0 0 10px 3px #67A0C1";
    eraser.style.boxShadow = "0 0 10px 3px #67A0C1";
    fill.style.boxShadow = "0 0 10px 3px #0aa5ffff";
    rainbow.style.boxShadow = "0 0 10px 3px #67A0C1";
    darken.style.boxShadow = "0 0 10px 3px #67A0C1";
});

const rainbow = document.querySelector(".rainbow");
rainbow.addEventListener("click", () => {
    isPen = false;
    isEraser = false;
    isFill = false;
    isRainbow = true;
    isDark = false;

    pen.style.boxShadow = "0 0 10px 3px #67A0C1";
    eraser.style.boxShadow = "0 0 10px 3px #67A0C1";
    fill.style.boxShadow = "0 0 10px 3px #67A0C1";
    rainbow.style.boxShadow = "0 0 10px 3px #0aa5ffff";
    darken.style.boxShadow = "0 0 10px 3px #67A0C1";

});

const darken = document.querySelector(".darken");
darken.addEventListener("click", () => {
    isPen = false;
    isEraser = false;
    isFill = false;
    isRainbow = false;
    isDark = true;
    pen.style.boxShadow = "0 0 10px 3px #67A0C1";
    eraser.style.boxShadow = "0 0 10px 3px #67A0C1";
    fill.style.boxShadow = "0 0 10px 3px #67A0C1";
    rainbow.style.boxShadow = "0 0 10px 3px #67A0C1";
    darken.style.boxShadow = "0 0 10px 3px #0aa5ffff";

});

const clear = document.querySelector(".delete");
clear.addEventListener("click", () => generateCanvas("#ffffff"));



function generateCanvas(color) {
    let div;
    let size = slider.value;
    if (container.children.length != 0) {
        container.textContent = "";
    }
    for (let i = 0; i < size ** 2; i++) {
        div = document.createElement("div");
        div.style.height = `${calculateSide(size)}px`;
        div.style.width = `${calculateSide(size)}px`;
        div.style.backgroundColor = color;
        div.setAttribute("draggable", "false");
        div.addEventListener("mouseover", (e) => draw(e));
        div.addEventListener("mousedown", (e) => { isMouseDown = true; draw(e) });
        div.addEventListener("mouseup", (e) => { isMouseDown = false; });
        container.appendChild(div);
    }
}

function calculateSide(size) {

    const totalSqaures = size ** 2;
    return Math.sqrt(490000 / totalSqaures);
}

function draw(e) {

    if (isMouseDown) {
        if (isPen) {
            e.target.style.backgroundColor = color;
        } else if (isEraser) {
            e.target.style.backgroundColor = "#ffffff";
        } else if (isFill) {
            generateCanvas(color);
        } else if (isRainbow) {
            e.target.style.backgroundColor = randomColor();
        } else if (isDark) {
            changeOpacity(e);
        }
    }
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeOpacity(e) {


    e.target.style.opacity = getComputedStyle(e.target).opacity - 0.1;

}