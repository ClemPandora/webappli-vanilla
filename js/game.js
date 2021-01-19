const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

let character = {
    xSize : 50,
    ySize : 50,
    x : 0,
    y : 0,
    xSpeed : 2,
    ySpeed : 2
}

character.x = (canvas.width - character.xSize)/2;
character.y = canvas.height - character.ySize - 10;

let gyroscope = new Gyroscope({frequency: 60});
gyroscope.start();

function gameLoop(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    let charPosX = character.x - gyroscope.x/5 * character.xSpeed;

    ctx.fillStyle = 'green';
    ctx.fillRect(charPosX, character.y, character.xSize, character.ySize);
}

setInterval(gameLoop, 1000/60)
