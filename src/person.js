var Person = function(x,y,width,height,scale,color,den,num) {
	
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
		density: .015,
		color: color
	});

	var leftArmOptions = Common.extend({
		label : 'leftArm',
		collisionFilter : {
			group : group
		},
		density : den,
		color: color,
		angle : rad(-45)
	});

	var rightArmOptions = Common.extend({
		label : 'rightArm',
		collisionFilter : {
			group : group
		},
		density : den,
		color: color,
		angle : rad(45)
	});

	var leftLegOptions = Common.extend({
		label : 'leftLeg',
		collisionFilter : {
			group : group
		},
		density : den*5,
		color: color,
		angle : rad(45),
		//isStatic : true
	});

	var rightLegOptions = Common.extend({
		label : 'rightLeg',
		collisionFilter : {
			group : group
		},
		density : den*5,
		color: color,
		angle : rad(-45),
		//isStatic : true
	});

	var limbOffsetX = 15;
	var shoulderOffset = height * 0.5 - 55; // 25 - 55 = -30
	var neckOffset = height * 0.5 - 65; // 25 - 65 = -40
	var groinOffset = height * 0.5;

	var chest = Bodies.rectangle( x , y , width , height , chestOptions );
	var head = Bodies.circle( x , y + neckOffset , width * 2 , headOptions );
	var leftArm = Bodies.rectangle( x - 15 , y + shoulderOffset , 5 , 25 , leftArmOptions );
	var rightArm = Bodies.rectangle( x + 15 , y + shoulderOffset , 5 , 25 , rightArmOptions );
	var leftLeg = Bodies.rectangle( x - 25 , y - shoulderOffset , 5 , 40 , leftLegOptions );
	var rightLeg = Bodies.rectangle( x + 25 , y - shoulderOffset , 5 , 40 , rightLegOptions );

	var neck = Constraint.create({
		bodyB : chest,
		pointB: { x: 0, y: neckOffset },
		bodyA : head,
		stiffness : 1,
		length : 0
	});

	var leftShoulder = Constraint.create({bodyB : chest, bodyA : leftArm, stiffness : 1 });
	var rightShoulder = Constraint.create({bodyB : chest, bodyA : rightArm, stiffness : 1 });
	var armToArm = Constraint.create({bodyB : leftArm, bodyA : rightArm, stiffness : 1 });
	var leftEar = Constraint.create({bodyB : head, bodyA : leftArm, stiffness : 1 });
	var rightEar = Constraint.create({bodyB : head, bodyA : rightArm, stiffness : 1 });

	var leftHip = Constraint.create({bodyB : chest, bodyA : leftLeg, stiffness : 1 });
	var rightHip = Constraint.create({bodyB : chest, bodyA : rightLeg, stiffness : 1 });

	var leftGroin = Constraint.create({
		bodyB : chest,
		pointB : { x : 0 , y : groinOffset},
		bodyA : leftLeg,
		stiffness : 1,
		//length: 0
	});

	var rightGroin = Constraint.create({
		bodyB : chest,
		pointB : { x : 0 , y : groinOffset},
		bodyA : rightLeg,
		stiffness : 1,
		//length: 0
	});

	var upperLegToLeg = Constraint.create({bodyB : leftLeg, pointB : {x : 5, y:-5}, bodyA : rightLeg, pointA : {x : -5, y:-5}, stiffness : 1 });
	var lowerLegToLeg = Constraint.create({bodyB : leftLeg, pointB : {x : -5, y:5}, bodyA : rightLeg, pointA : {x : 5, y:5}, stiffness : 1 });

	var person = Composite.create({
		bodies : [ head, chest , leftArm, rightArm, leftLeg, rightLeg ],
		constraints : [ neck , leftShoulder, rightShoulder, armToArm, leftEar , rightEar, leftHip, rightHip, leftGroin, rightGroin, upperLegToLeg, lowerLegToLeg],
		label : num
	});

	World.add(engine.world, person);

	people.push(person);

	return person;
}