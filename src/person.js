var Person = function(x,y,scale, tp1, tp2, color) {
	
	scale = typeof scale === 'undefined' ? 1 : scale;

	var headOptions = Common.extend({
		label : 'head',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 5,
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
		mass : 1,
		color: color,
		//isStatic : true,
		angle : rad(-45)
	});

	var rightArmOptions = Common.extend({
		label : 'rightArm',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 1,
		color: color,
		//isStatic : true,
		angle : rad(45)
	});

	var shoulderPositions = {
		l : {
			y : y-20,
			x : x-15
		},
		r : {
			y : y-20,
			x : x+15
		}
	}

	var head = Bodies.circle( x , y-35 , 10 , headOptions );
	var chest = Bodies.rectangle( x , y , 5 , 50 , chestOptions );
	var leftArm = Bodies.rectangle( shoulderPositions.l.x , shoulderPositions.l.y , 5 , 25 , leftArmOptions );
	var rightArm = Bodies.rectangle( shoulderPositions.r.x , shoulderPositions.r.y , 5 , 25 , rightArmOptions );

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

	var leftShoulder = Constraint.create({
		bodyA : chest,
		bodyB : leftArm,
		stiffness : .5,
		pointA : {
			x : shoulderPositions.l.x + 5,
			y : shoulderPositions.l.y + 5
		},
		pointB : {
			x : shoulderPositions.l.x - 5,
			y : shoulderPositions.l.y -5
		}
	})

	var rightShoulder = Constraint.create({
		bodyA : chest,
		bodyB : leftArm,
		stiffness : .5,
		pointA : {
			x : shoulderPositions.r.x - 5,
			y : shoulderPositions.r.y + 5
		},
		pointB : {
			x : shoulderPositions.r.x + 5,
			y : shoulderPositions.r.y - 5
		}
	})

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
		constraints : [ neck , leftShoulder, rightShoulder ]
	});

	World.add(engine.world, person);
	

	people.push(person);

	return person;
}