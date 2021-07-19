let fg, bg;
let vehicle;

function setup()
{
    createCanvas(640, 640);
    bg = color(0);
    fg = color(255);
    stroke(fg);
    strokeWeight(1);
    noFill();
    vehicle = new Vehicle();
}

function draw()
{
    background(bg);
    translate(width / 2, height / 2);
    scale(1, -1);

    let target = createVector(mouseX - width / 2, height / 2 - mouseY);
    let desired = vehicle.seek(target);
    // let desired = vehicle.flee(target);

    vehicle.update(desired);
    vehicle.show();
}
