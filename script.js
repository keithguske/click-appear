const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Body = Matter.Body
        Composite = Matter.Composite;

// create runner
const runner = Runner.create();

// All of the squares that will appear on the canvas
const actors = [ 
    rectangleFactory(50, 10),
    rectangleFactory(80, 20),
    rectangleFactory(80, 80),
    rectangleFactory(50, 90),
    rectangleFactory(20, 80),
    rectangleFactory(20, 20),
];
let counter = 0;

function demo() {
    // create an engine
    var engine = Engine.create();
    engine.gravity.y = 0;

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth - 20,
            height: window.innerHeight - 20
        }
    });

    // add all of the bodies to the world
    Composite.add(engine.world, actors);


    // run the renderer
    Render.run(render);

    // run the engine
    Runner.run(runner, engine);
    console.log('STARGIN');
}

// Toggle visibility for the squares, round robin style
function visibility() {
    actors[counter % actors.length].render.visible = !actors[counter % actors.length].render.visible;
    counter++;
}

// Scale x coordinates within the canvas based on viewport width
function percentX(percent) {
    return Math.round(percent/100 * window.innerWidth);
}

// Scale y coordinates within the canvas based on viewport height
function percentY(percent) {
    return Math.round(percent/100 * window.innerHeight);
}

// Generates a square with the desired properties centered at coordinates x,y assuming a canvas of 100 x 100
function rectangleFactory(x, y) {
    const shape = Bodies.rectangle(percentX(x), percentY(y), 80, 80, { 
        torque: .5, 
        frictionAir: 0, 
        mass: 1000,
        render: {
            visible: false
        }
    });

    Body.rotate(shape, getRandomInt(90));
    return shape;
}

// Returns a random integer between 0 and max - 1, inclusive
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}