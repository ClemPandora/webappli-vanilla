const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

let character = {
    xSize : 50,
    ySize : 50,
    x : 0,
    y : 0,
    xSpeed : 10,
    ySpeed : 10
}

character.x = (canvas.width - character.xSize)/2;
character.y = canvas.height - character.ySize - 10;

let gyroscope = new Gyroscope({frequency: 60});
gyroscope.start();

const debug = document.getElementById("debug");

function gameLoop(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    debug.innerHTML = "Gyro x : " + gyroscope.x;
    
    ctx.fillStyle = 'green';
    ctx.fillRect(character.x + gyroscope.x * 10, character.y, character.xSize, character.ySize);
}

setInterval(gameLoop, 1000/60)
