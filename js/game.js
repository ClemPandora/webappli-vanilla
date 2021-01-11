const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
let moveX = 2;
let moveY = 2;

const cubeSizeX = 100;
const cubeSizeY = 100;

var img = new Image();
img.src = 'img/DVD_video_logo.png';

function gameLoop(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(img, x, y, cubeSizeX, cubeSizeY);
    
    if(x+cubeSizeX+moveX >= canvas.width || x+moveX <= 0){
        moveX *= -1;
    }
    if(y+cubeSizeY+moveY >= canvas.height || y+moveY <= 0){
        moveY *= -1;
    }
    x+=moveX;
    y+=moveY;
}
img.onload = function() {
    setInterval(gameLoop, 1000/60)
}
