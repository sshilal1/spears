var Person = function(x,y,scale, testpoint) {
	
	scale = typeof scale === 'undefined' ? 1 : scale;

	var headOptions = Common.extend({
		label : 'head',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 10
	});

	var chestOptions = Common.extend({
		label : 'chest',
		collisionFilter : {
			group : Body.nextGroup(true)
		},
		mass : 10
	});

	var head = Bodies.circle( x , 145 , 10 , headOptions );
	var chest = Bodies.rectangle( x, 200 ,5,70 , chestOptions );

	/*var leftArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var leftLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	var rightLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
	*/

	var neck = Constraint.create({
		bodyA : head,
		bodyB : chest,
		stiffness : 1,
		render : { visible: false },
		pointA: {
			x: 0,
			y: testpoint
		},
		pointB: {
			x: 0,
			y: - testpoint
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