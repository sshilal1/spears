// ************************
// *** Initialize Platforms
const platforms = [
  Bodies.rectangle(50,390,100,10,{color: "blue", isStatic: true}),
  Bodies.rectangle(500,250,100,10,{color: "red", isStatic: true})
]
World.add(engine.world, platforms);
// ************************
// ************************
// *** Initialize Target
const targets = []
function addTarget() {
	var target = Bodies.rectangle(520,200,5,80,{friction: 1, mass: 10});
	targets.push(target);
	World.add(engine.world, target);
};
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
		x: dx/5000,
		y: dy/5000
	}

	var myangle = Math.atan( dy / dx );

	var spear = Bodies.rectangle(x1,y1,50,2,{
		mass : 1,
		angle : myangle
	});

	console.log(spear);
	Matter.Body.setAngularVelocity(spear, 0.025);
	Matter.Body.applyForce(spear,{x:x1,y:y1},vectorForce);

	spears.push(spear);
	World.add(engine.world, spear);
}

canvas.addEventListener("mousedown", launchSpear, false);

var people = [];
var myperson = new Person(455,200,1,10, -5, "red");
var myperson2 = new Person(485,200,1,10, -10, "blue");
var myperson3 = new Person(515,200,1,10, -15, "green");
var myperson4 = new Person(545,200,1,10, -20, "yellow");
people.push(myperson);
people.push(myperson2);
people.push(myperson3);
people.push(myperson4);

for (var person of people) {
	for (let i = person.bodies.length - 1; i >= 0; i--) {
		console.log(person.bodies[i]);
		World.add(engine.world, person.bodies[i]);
	}
	for (let i = person.constraints.length - 1; i >= 0; i--) {
		console.log(person.constraints[i]);
		World.add(engine.world, person.constraints[i]);
	}
}
// ************************
// ************************
// *** Game Render Function
(function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = spears.length - 1; i >= 0; i--) {
		draw(spears[i], ctx);

		if (!inBounds(spears[i], canvas)) {
			World.remove(engine.world, spears[i]);
			spears.splice(i, 1);
		}
	}
	// ***************
	// Handle targets
	/*if (targets.length === 0) {
		addTarget()
	}*/

	// ***************
	// Handle person
	people.forEach(function(person) {
		for (let i = person.bodies.length - 1; i >= 0; i--) {
			draw(person.bodies[i], ctx);
		}
		console.log(person);
	});

	for (let i = targets.length - 1; i >= 0; i--) {
		draw(targets[i], ctx);

		if (!inBounds(targets[i], canvas)) {
			World.remove(engine.world, targets[i]);
			targets.splice(i, 1);
		}
	}
	// ***************
	platforms.forEach(e => draw(e, ctx));
	
	Engine.update(engine);
	requestAnimationFrame(update);
})();