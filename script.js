const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Body = Matter.Body
        Composite = Matter.Composite;

const runner = Runner.create();

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

    // create runner
    // var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    console.log('STARGIN');
}

function visibility() {
    // boxA.render.visible = !boxA.render.visible;
    // console.log("Visibility Toggled")
    actors[counter % actors.length].render.visible = !actors[counter % actors.length].render.visible;
    counter++;
}

function percentX(percent) {
    return Math.round(percent/100 * window.innerWidth);
  }
function percentY(percent) {
    return Math.round(percent/100 * window.innerHeight);
}

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}