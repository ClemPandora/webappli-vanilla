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
let gyroValue = {
    x: 0,
    y: 0,
    z: 0
}
gyroscope.addEventListener('reading', e => {
    gyroValue.x += gyroscope.x
    gyroValue.y += gyroscope.y
    gyroValue.z += gyroscope.z
});
gyroscope.start();

const debug = document.getElementById("debug");

function gameLoop(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    debug.innerHTML = "Gyro x : " + gyroValue.y;
    
    ctx.fillStyle = 'green';
    ctx.fillRect(character.x= + gyroValue.y * 10, character.y, character.xSize, character.ySize);
}

setInterval(gameLoop, 1000/60)
