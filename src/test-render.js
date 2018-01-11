var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showAngleIndicator: true,
        background: '#fff'
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

const platforms = [
    Bodies.rectangle(50,390,100,10,{color: "blue", isStatic: true}),
    Bodies.rectangle(500,250,100,10,{color: "red", isStatic: true})
]
World.add(world, platforms);