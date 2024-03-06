const canvas = document.getElementById("signature-pad");
const clear = document.getElementById("clear-button");
const download = document.getElementById("download-button");

const ctx = canvas.getContext("2d");

let drawing = false;
let prevX = 0;
let prevY = 0;

canvas.addEventListener("mousedown" , (e)=>{
    drawing = true;
    prevX = e.clientX - canvas.getBoundingClientRect().left;
    prevY = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("mousemove" , (e)=>{
    if(!drawing) return;
    draw(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);

});

canvas.addEventListener("mouseup" , (e)=>{
    drawing = false;
});

canvas.addEventListener("mouseleave" , (e)=>{
    drawing = false;
});

function draw(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y); // Add this line
    ctx.closePath();
    ctx.stroke();
    prevX = x;
    prevY = y;
}

clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

download.addEventListener("click",()=>{
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = "signature.png";
    a.click();
});


