const newbods = [];
const platforms = [
  Bodies.rectangle(80,370,100,10,{color: "blue", isStatic: true}),
  Bodies.rectangle(500,250,100,10,{color: "red", isStatic: true})
]
World.add(engine.world, platforms);


canvas.addEventListener("mousedown", launchFromSpot, false);

function testLaunch(e) {
	// 50 to 534 for y, 50 for x
	var x=50;
	var y=60;
	for(let i=1; i<=10; i++) {
  	var mybox = Bodies.rectangle(x,y*i,20,20)
		newbods.push(mybox);

		Matter.Body.setAngle(mybox, rad(-55));
		Matter.Body.applyForce(mybox,{x:x,y:y*i},{x:.01,y:-.01});
		World.add(engine.world, mybox);
	}
}

function launchFromSpot(event)
{
  var x = event.x - 50;
  var y = event.y - 100;
  console.log("x: " + x + " y: "+ y);
  var mybox = Bodies.rectangle(x,y,20,5,{ frictionAir: 0.01, friction: 0.1, restitution: 0.1 });
  newbods.push(mybox);
  
  Matter.Body.setAngle(mybox, rad(-45));
  Matter.Body.applyForce(mybox,{x:x,y:y-.25},{x:.005,y:-.005});
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