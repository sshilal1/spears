var headOptions = Common.extend({
	label : 'head',
	collisionFilter : {
		group : Body.nextGroup(true)
	}
});

var chestOptions = Common.extend({
	label : 'chest',
	collisionFilter : {
		group : Body.nextGroup(true)
	}
});

var head = Bodies.circle( x , y-60 , 55*scale , headOptions );
var chest = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );

/*var leftArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
var leftLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
var rightArm = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
var rightLeg = Bodies.rectangle( x , y , 55*scale , 80*scale , chestOptions );
*/

var neck = Constraint.create({
	bodyA : head,
	bodyB : chest,
	stiffness : 0.6,
	render : { visible: false }
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

var enemy = Composite.create({
	bodies : [ head, chest ],
	constraints : [ neck ]
});