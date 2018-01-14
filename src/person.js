var Person = function(x,y,width,height,scale,color) {
	
	scale = typeof scale === 'undefined' ? 1 : scale;

	var headOptions = Common.extend({
		label : 'head',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		color: color
	});

	var chestOptions = Common.extend({
		label : 'chest',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		density: .0002,
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
	var neckOffset = 50;

	var chest = Bodies.rectangle( x , y , width , height , chestOptions );
	var head = Bodies.circle( x , y-neckOffset , width , headOptions );

	var leftArm = Bodies.rectangle( shoulderPositions.l.x , shoulderPositions.l.y , 5 , 25 , leftArmOptions );
	var rightArm = Bodies.rectangle( shoulderPositions.r.x , shoulderPositions.r.y , 5 , 25 , rightArmOptions );

	console.log(chest);
	/*var leftArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var leftLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	*/

	var neck = Constraint.create({
		bodyB : chest,
		pointB: { x: 0, y: neckOffset },
		bodyA : head,
		stiffness : 1,
		length : 0	
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

	var person = Composite.create({ 'label': 'enemy'});
	Composite.addBody(person, chest);
	Composite.addBody(person, head);
	Composite.addConstraint(person, neck);
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