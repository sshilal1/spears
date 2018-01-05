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

const Engine = Matter.Engine;
const Events = Matter.Events;
const World = Matter.World;
const Vector = Matter.Vector;
const Bodies = Matter.Bodies;
const engine = Engine.create();

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