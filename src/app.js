//https://github.com/liabru/matter-js/wiki/Rendering
// ************************
// *** Initialize Platforms
const platforms = [
  Bodies.rectangle(50,390,100,10,{color: "blue", isStatic: true}),
  Bodies.rectangle(400,250,200,10,{color: "red", isStatic: true})
]
World.add(engine.world, platforms);
// ************************
// ************************
// *** Fire functions
const spears = [];
function launchSpear(location)
{
	var x1 = 50;
	var y1 = 350;

	var dx = location.x - x1;
	var dy = location.y - y1;

	var vectorForce = {
		x: dx/50000,
		y: dy/50000
	}

	var myangle = Math.atan( dy / dx );

	var spear = Bodies.rectangle(x1,y1,50,2,{
		density : .001,
		angle : myangle,
		render: {
			sprite: {
				texture: './img/spear1.png'
			}
		}
	});

	console.log(spear);
	Matter.Body.setAngularVelocity(spear, 0.025);
	Matter.Body.applyForce(spear,{x:x1,y:y1},vectorForce);

	spears.push(spear);
	World.add(engine.world, spear);
}

canvas.addEventListener("mousedown", launchSpear, false);

var people = [];
var myperson = new Person(450,200,5,50,1,"red",.01,"p1");
//var myperson2 = new Person(350,200,5,50,1,"blue", .1);
//var myperson3 = new Person(250,200,5,50,1,"green", 1);
//var myperson4 = new Person(150,200,5,50,1,"yellow", .01);

// ************************
// ************************
// *** Game Render Function

(function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// ***************
	// Handle spears
	for (let i = spears.length - 1; i >= 0; i--) {
		draw(spears[i], ctx);

		if (!inBounds(spears[i], canvas)) {
			World.remove(engine.world, spears[i]);
			spears.splice(i, 1);
		}
	}

	// ***************
	// Handle people
	people.forEach(function(person) {
		var bodiesLeft = person.bodies.length - 1;
		for (let i = bodiesLeft; i >= 0; i--) {
			draw(person.bodies[i], ctx);

			if (!inBounds(person.bodies[i], canvas)) {
				World.remove(engine.world, person.bodies[i]);
				person.bodies.splice(i, 1);
			}
		}
		if (bodiesLeft === -1) { console.log("make new enemy"); }
	});
	// ***************
	// Handle platforms
	platforms.forEach(e => draw(e, ctx));
	
	Engine.update(engine);
	requestAnimationFrame(update);
})();