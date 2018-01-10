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

	var head = Bodies.circle( x , y-50 , 10 , headOptions );
	var chest = Bodies.rectangle( x, y ,5,70 , chestOptions );

	/*var leftArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var leftLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	*/

	var neck = Constraint.create({
		bodyA : head,
		bodyB : chest,
		stiffness : 1,
		render : { visible: true },
		pointA: {
			x: 0,
			y: tp1
		},
		pointB: {
			x: 0,
			y: tp2
		},
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
		bodies : [ head, chest ],
		constraints : [ neck ]
	});

	return person;
}