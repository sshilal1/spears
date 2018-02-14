"use strict";

const rad = d => d * Math.PI / 180;
const deg = d => d * 180 / Math.PI;
const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 400;
canvas.style.border = "2px solid black";
document.getElementById("matter").appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

var Engine = Matter.Engine,
	Events = Matter.Events,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Common = Matter.Common,
	Composite = Matter.Composite,
	Composites = Matter.Composites,
	Constraint = Matter.Constraint,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Vector = Matter.Vector;
const engine = Engine.create();

const draw = (body, ctx) => {
  if (body.render.sprite.texture) {
    console.log("sprite");
  }
  else {
    ctx.fillStyle = body.color || "#fff";
    ctx.beginPath();
    body.vertices.forEach(e => ctx.lineTo(e.x, e.y));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
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