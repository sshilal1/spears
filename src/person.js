var Person = function(x,y,scale, tp1, tp2, color) {
	
	scale = typeof scale === 'undefined' ? 1 : scale;

	var headOptions = Common.extend({
		label : 'head',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 10,
		color: color
	});

	var chestOptions = Common.extend({
		label : 'chest',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 10,
		color: color
	});

	var leftArmOptions = Common.extend({
		label : 'leftArm',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 10,
		color: color,
		isStatic : true,
		angle : rad(-45)
	});

	var rightArmOptions = Common.extend({
		label : 'rightArm',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 10,
		color: color,
		isStatic : true,
		angle : rad(45)
	});

	var shoulderPositions = {
		l : {
			y : y-15,
			x : x-15
		},
		r : {
			y : y-15,
			x : x+15
		}
	}

	var head = Bodies.circle( x , y-35 , 10 , headOptions );
	World.add(engine.world, head);
	var chest = Bodies.rectangle( x , y , 5 , 50 , chestOptions );
	World.add(engine.world, chest);
	var leftArm = Bodies.rectangle( x-15 , y-15 , 5 , 25 , leftArmOptions );
	World.add(engine.world, leftArm);
	var rightArm = Bodies.rectangle( x+15 , y-15 , 5 , 25 , rightArmOptions );
	World.add(engine.world, rightArm);

	/*var leftArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var leftLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	*/

	var neck = Constraint.create({
		bodyA : head,
		bodyB : chest,
		stiffness : 1.0,
		pointA: {
			x: 0,
			y: tp1
		},
		pointB: {
			x: 0,
			y: tp2
		},
	});
	World.add(engine.world, neck);

	var leftShoulder = Constraint.create({
		bodyA : chest,
		bodyB : leftArm,
		stiffness : 1.0,
		pointA : {
			x : x-5,
			y : y-15
		},
		pointB : {
			x : x-7,
			y : y-17
		}
	})
	World.add(engine.world, leftShoulder);

	var rightShoulder = Constraint.create({
		bodyA : chest,
		bodyB : leftArm,
		stiffness : 1.0,
		pointA : {
			x : x-5,
			y : y-15
		},
		pointB : {
			x : x-7,
			y : y-17
		}
	})
	World.add(engine.world, rightShoulder);

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
		bodies : [ head, chest, leftArm, rightArm ],
		constraints : [ neck, leftShoulder, rightShoulder ]
	});

	people.push(person);

	return person;
}