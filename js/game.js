const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

const PERSPECTIVE = canvas.width; // The field of view of our 3D scene
const PROJECTION_CENTER_X = canvas.width / 2; // x center of the canvas
const PROJECTION_CENTER_Y = canvas.height / 1.8; // y center of the canvas
const CUBE_SIZE = canvas.width/5;
const dots = []; // Store every particle in this array
const faces = [];
let rotateX = 0;
let rotateY = 0;

class Dot {
    constructor(x,y,z) {
        this.x = x;//(Math.random() - 0.5) * canvas.width; // Give a random x position
        this.y = y;//(Math.random() - 0.5) * canvas.height; // Give a random y position
        this.z = z;//Math.random() * canvas.width; // Give a random z position
        this.radius = 10; // Size of our element in the 3D world
        
        this.xProjected = 0; // x coordinate on the 2D world
        this.yProjected = 0; // y coordinate on the 2D world
        this.scaleProjected = 0; // Scale of the element on the 2D world (further = smaller)
    }
    // Project our element from its 3D world to the 2D canvas
    project() {
        // The scaleProjected will store the scale of the element based on its distance from the 'camera'
        this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
        // The xProjected is the x position on the 2D world
        this.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X;
        // The yProjected is the y position on the 2D world
        this.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y;
    }
    // Draw the dot on the canvas
    rotate() {
        this.rotateX(rotateX);
        this.rotateY(rotateY)
    }
    rotateX(angle) {
        let sin_t = Math.sin(angle);
        let cos_t = Math.cos(angle);
        let y = this.y;
        let z = this.z;
        this.y = y * cos_t - z * sin_t;
        this.z = z * cos_t + y * sin_t;
    }
    rotateY(angle) {
        let sin_t = Math.sin(angle);
        let cos_t = Math.cos(angle);
        let x = this.x;
        let z = this.z;
        this.x = x * cos_t - z * sin_t;
        this.z = z * cos_t + x * sin_t;
    }
    rotateZ(angle) {
        let sin_t = Math.sin(angle);
        let cos_t = Math.cos(angle);
        let x = this.x;
        let y = this.y;
        this.x = x * cos_t - y * sin_t;
        this.y = y * cos_t + x * sin_t;
    }
}

class Face {
    constructor(vertex1,vertex2,vertex3,vertex4,color) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.vertex3 = vertex3;
        this.vertex4 = vertex4;
        this.color = color;
        this.sortPriority = 0;
    }
    project(){
        this.sortPriority = Math.max(this.vertex1.z,this.vertex2.z, this.vertex3.z, this.vertex4.z);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.vertex1.xProjected, this.vertex1.yProjected);
        ctx.lineTo(this.vertex2.xProjected, this.vertex2.yProjected);
        ctx.lineTo(this.vertex3.xProjected, this.vertex3.yProjected);
        ctx.lineTo(this.vertex4.xProjected, this.vertex4.yProjected);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

dots.push(new Dot(-CUBE_SIZE, -CUBE_SIZE, -CUBE_SIZE));
dots.push(new Dot(-CUBE_SIZE, -CUBE_SIZE,  CUBE_SIZE));
dots.push(new Dot(-CUBE_SIZE,  CUBE_SIZE, -CUBE_SIZE));
dots.push(new Dot(-CUBE_SIZE,  CUBE_SIZE,  CUBE_SIZE));
dots.push(new Dot(CUBE_SIZE, -CUBE_SIZE, -CUBE_SIZE));
dots.push(new Dot(CUBE_SIZE, -CUBE_SIZE,  CUBE_SIZE));
dots.push(new Dot(CUBE_SIZE,  CUBE_SIZE, -CUBE_SIZE));
dots.push(new Dot(CUBE_SIZE,  CUBE_SIZE,  CUBE_SIZE));

faces.push(new Face(dots[1],dots[5],dots[7],dots[3],"red"));
faces.push(new Face(dots[0],dots[4],dots[6],dots[2],"green"));
faces.push(new Face(dots[2],dots[6],dots[7],dots[3],"yellow"));
faces.push(new Face(dots[0],dots[4],dots[5],dots[1],"blue"));
faces.push(new Face(dots[4],dots[6],dots[7],dots[5],"purple"));
faces.push(new Face(dots[0],dots[2],dots[3],dots[1],"orange"));

function render() {
    // Clear the scene from top left to bottom right
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    
    // Loop through the dots array and draw every dot
    for (let i = 0; i < dots.length; i++) {
        dots[i].project();
    }
    for (let i = 0; i < faces.length; i++) {
        faces[i].project();
    }
    faces.sort((face1, face2)=>{
        return face2.sortPriority - face1.sortPriority;
    });
    for (let i = 0; i < faces.length; i++) {
        faces[i].draw();
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].rotate();
    }
    ctx.font = "30px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Spin it!", canvas.width/2, canvas.height/5);
    // Request the browser the call render once its ready for a new frame
    window.requestAnimationFrame(render);
}

render();

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||
         evt.originalEvent.touches;
}                                                     

function handleTouchStart(evt) {
    rotateY = 0;
    rotateX = 0;
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};                                                

function handleTouchMove(evt) {
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        rotateY=-xDiff/8000;
    } else {
        rotateX=-yDiff/8000;
    }
};