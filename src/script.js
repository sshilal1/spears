const newbods = [];
const platforms = [
  Bodies.rectangle(50,390,100,10,{color: "blue", isStatic: true}),
  Bodies.rectangle(500,250,100,10,{color: "red", isStatic: true}),
  Bodies.rectangle(520,200,5,80,{friction: 1})//, isStatic: true, isSensor: true})
]
Matter.Body.setMass(platforms[2], 100);
World.add(engine.world, platforms);


Events.on(engine, 'collisionStart', function(event) {
  var pairs = event.pairs;
  
  for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA === platforms[2]) {
      	console.log(pair.bodyA);
				Matter.Body.setStatic(pair.bodyA, false);
				Matter.Body.setVelocity(pair.bodyA, pair.bodyB.velocity);
      } else if (pair.bodyB === platforms[2]) {
				console.log(pair.bodyB);
				Matter.Body.setStatic(pair.bodyB, false);
				Matter.Body.setVelocity(pair.bodyB, pair.bodyA.velocity);
      }
  }
});

Events.on(engine, 'collisionEnd', function(event) {
  var pairs = event.pairs;
  
  for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA === platforms[2]) {
        Matter.Body.setStatic(pair.bodyB, true);
      } else if (pair.bodyB === platforms[2]) {
        Matter.Body.setStatic(pair.bodyA, true);
      }
  }
});

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

console.log(rad(-45));

function launchFromSpot(event)
{
	var x1 = 50;
	var y1 = 350;

  var x2 = event.x;
  var y2 = event.y;

  var dx = x2 - x1;
  var dy = y2 - y1;

  console.log("x: " + x2 + " y: "+ y2);
  //console.log("dx: " + dx + " dy: "+ dy);

  var vectorForce = {
    x: dx/5000,
    y: dy/5000
  }
  console.log(vectorForce);

  var myangle = Math.atan( dy / dx );
  console.log("angle: "+ myangle);
  
  var mybox = Bodies.rectangle(x1,y1,50,2);
  
  Matter.Body.setMass(mybox, 1);
  Matter.Body.setAngle(mybox, myangle);
  Matter.Body.setAngularVelocity(mybox, 0.025);
  Matter.Body.applyForce(mybox,{x:x1,y:y1},vectorForce);

  newbods.push(mybox);
  World.add(engine.world, mybox);
}

function launchFromSpotOld(event)
{
  var x = event.x - 50;
  var y = event.y - 100;


  console.log("x: " + x + " y: "+ y);
  var mybox = Bodies.rectangle(x,y,50,2);
  newbods.push(mybox);
  
  
  Matter.Body.setAngle(mybox, rad(-45));
  Matter.Body.setAngularVelocity(mybox, .025);
  Matter.Body.applyForce(mybox,{x:x,y:y},{x:.005,y:-.005});
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