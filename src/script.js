"use strict";

const rad = d => d * Math.PI / 180;
const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 400;
canvas.style.border = "2px solid black";
document.getElementById("matter").appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

const Engine = Matter.Engine;
const World = Matter.World;
const Vector = Matter.Vector;
const Bodies = Matter.Bodies;
const engine = Engine.create();
const MouseConstraint = Matter.MouseConstraint;
const mouseConstraint = MouseConstraint.create(engine);
const setMouseOffset = () => {
  const rect = canvas.getBoundingClientRect();
  Matter.Mouse.setOffset(mouseConstraint.mouse, {
    x: -rect.x, y: -rect.y
  });
};
setMouseOffset();
document.addEventListener("mousemove", e => 
  setTimeout(setMouseOffset, 500)
);
World.add(engine.world, mouseConstraint);


const platforms = [
  Bodies.rectangle(80,370,100,10,{color: "blue", isStatic: true}),
  Bodies.rectangle(500,250,100,10,{color: "red", isStatic: true})
]
World.add(engine.world, platforms);

const draw = (body, ctx) => {
  ctx.fillStyle = body.color || "#fff";
  ctx.beginPath();
  body.vertices.forEach(e => ctx.lineTo(e.x, e.y));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

const inBounds = (body, canvas) => {
  for (let i = 0; i < body.vertices.length; i++) {
    if (body.vertices[i].x < canvas.width &&
      body.vertices[i].x > 0 &&
      body.vertices[i].y < canvas.height) {
      return true;
    }
  }

  return false;
};

const newbods = [];
canvas.addEventListener("mousedown", getPosition, false);
function getPosition(event)
{
  var x = event.x;
  var y = event.y;
  console.log("x: " + x + " y: "+ y);
  var mybox = Bodies.rectangle(x,y,20,20,{ frictionAir: 0.01, friction: 0.1, restitution: 0.1 });
  newbods.push(mybox);
  
  Matter.Body.setAngle(mybox, rad(-55));
  Matter.Body.applyForce(mybox,{x:0,y:-10},{x:.01,y:-.01});
  World.add(engine.world, mybox);
}

(function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = newbods.length - 1; i >= 0; i--) {
    draw(newbods[i], ctx);

    if (!inBounds(newbods[i], canvas)) {
      World.remove(engine.world, newbods[i]);
      console.log("gone");
      newbods.splice(i, 1);
    }
  }
  
  platforms.forEach(e => draw(e, ctx));
  Engine.update(engine);
  requestAnimationFrame(update);
})();