var Person = function(x,y,width,height,scale,color) {
	
	scale = typeof scale === 'undefined' ? 1 : scale;
	var group = Body.nextGroup(true);

	var headOptions = Common.extend({
		label : 'head',
		collisionFilter : {
			group : group
		},
		color: color,
		friction: 0.8
	});

	var chestOptions = Common.extend({
		label : 'chest',
		collisionFilter : {
			group : group
		},
		density: .02,
		color: color
	});

	var leftArmOptions = Common.extend({
		label : 'leftArm',
		collisionFilter : {
			group : group
		},
		mass : 1,
		color: color,
		isStatic : true,
		angle : rad(-45)
	});

	var rightArmOptions = Common.extend({
		label : 'rightArm',
		collisionFilter : {
			group : group
		},
		mass : 1,
		color: color,
		isStatic : true,
		angle : rad(45)
	});

	var shoulderOffset = -height * 0.5 + 25;

	var neckOffset = -height * 0.5 + 65;
	var chest = Bodies.rectangle( x , y , width , height , chestOptions );
	var head = Bodies.circle( x , y - neckOffset , width * 2 , headOptions );
	var leftArm = Bodies.rectangle( x - 15 , y - shoulderOffset , 5 , 25 , leftArmOptions );
	var rightArm = Bodies.rectangle( x + 15 , y - shoulderOffset , 5 , 25 , rightArmOptions );

	console.log(chest);	
	/*
	var leftLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	*/

	var neck = Constraint.create({
		bodyB : chest,
		pointB: { x: 0, y: -neckOffset },
		bodyA : head,
		stiffness : 1,
		length : 0	
	});

	var leftShoulder = Constraint.create({	
		bodyB : chest,
		pointB : {
			x : x - 15,
			y : -shoulderOffset
		},
		bodyA : leftArm,
		stiffness : 1,
		length: 0
	});

	var rightShoulder = Constraint.create({	
		bodyB : chest,
		pointB : {
			x : x + 15,
			y : -shoulderOffset
		},
		bodyA : rightArm,
		stiffness : 1,
		length: 0
	});

	/*
	var enemy = Composite.create({
		bodies : [
			head, chest, leftArm, rightArm, leftLeg, rightLeg
		],
		contraints : [
			neck, leftShoulder, rightShoulder, leftHip, rightHip
		]
	})
	*/

	var person = Composite.create({ 'label': 'enemy'});
	Composite.addBody(person, chest);
	Composite.addBody(person, head);
	Composite.addBody(person, leftArm);
	Composite.addBody(person, rightArm);
	Composite.addConstraint(person, neck);
	Composite.addConstraint(person, leftShoulder);
	Composite.addConstraint(person, rightShoulder);
	/*
	var person = Composite.create({
		bodies : [ head, chest ],//, leftArm, rightArm ],
		constraints : [ neck ]// , leftShoulder, rightShoulder ]
	});
*/
	World.add(engine.world, person);
	

	people.push(person);

	return person;
}