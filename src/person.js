var Person = function(x,y,width,height,scale,color,den) {
	
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
		density : den,
		color: color,
		//isStatic : true,
		angle : rad(-45)
	});

	var rightArmOptions = Common.extend({
		label : 'rightArm',
		collisionFilter : {
			group : group
		},
		density : den,
		color: color,
		//isStatic : true,
		angle : rad(45)
	});

	var leftLegOptions = Common.extend({
		label : 'leftLeg',
		collisionFilter : {
			group : group
		},
		density : den,
		color: color,
		isStatic : true,
		angle : rad(45)
	});

	var rightLegOptions = Common.extend({
		label : 'rightLeg',
		collisionFilter : {
			group : group
		},
		density : den,
		color: color,
		isStatic : true,
		angle : rad(-45)
	});

	var shoulderOffset = -height * 0.5 + 55;

	var neckOffset = -height * 0.5 + 65;
	var chest = Bodies.rectangle( x , y , width , height , chestOptions );
	var head = Bodies.circle( x , y - neckOffset , width * 2 , headOptions );
	var leftArm = Bodies.rectangle( x - 15 , y - shoulderOffset , 5 , 25 , leftArmOptions );
	var rightArm = Bodies.rectangle( x + 15 , y - shoulderOffset , 5 , 25 , rightArmOptions );
	var leftLeg = Bodies.rectangle( x - 15 , y + shoulderOffset , 5 , 25 , leftLegOptions );
	var rightLeg = Bodies.rectangle( x + 15 , y + shoulderOffset , 5 , 25 , rightLegOptions );

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
			y : shoulderOffset - 5
		},
		bodyA : leftArm,
		stiffness : 1,
		length: 0
	});

	var rightShoulder = Constraint.create({	
		bodyB : chest,
		pointB : {
			x : x + 15,
			y : shoulderOffset - 5
		},
		bodyA : rightArm,
		stiffness : 1,
		length: 0
	});

	var leftEar = Constraint.create({
		bodyB : head,
		pointB : { x : 0 , y : neckOffset},
		bodyA : leftArm,
		stiffness : 1,
		length: 0
	});

	var rightEar = Constraint.create({
		bodyB : head,
		pointB : { x : 0 , y : neckOffset},
		bodyA : rightArm,
		stiffness : 1,
		length: 0
	})

	// I think each contraint needs to be shaped like a triangle
	// 2 contraints per arm, to keep the arm lifted

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

	var person = Composite.create({
		bodies : [ head, chest , leftArm, rightArm ],
		constraints : [ neck , leftShoulder, rightShoulder, leftEar , rightEar ]
	});

	World.add(engine.world, person);
	

	people.push(person);

	return person;
}