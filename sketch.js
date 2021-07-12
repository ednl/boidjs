let fg, bg;
let pursuer;

function setup()
{
    createCanvas(640, 640);
    fg = color(255);
    bg = color(0);
    pursuer = new Boid();
}

function draw()
{
    background(bg);
    translate(width / 2, height / 2);
    scale(1, -1);

    let target = createVector(mouseX - width / 2, height / 2 - mouseY);
    let force = p5.Vector.sub(target, pursuer.pos).div(1000);
    pursuer.update(force);
    pursuer.show();
}
