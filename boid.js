class Boid
{
    constructor()
    {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();
        this.mass = 1;
        this.size = 24;
        this.skin = 0;
    }

    // vec.normalize(), .limit() .setMag(), .heading()

    update(force)
    {
        if (force instanceof p5.Vector) {
            this.acc = p5.Vector.div(force, this.mass);
            this.vel = p5.Vector.add(this.vel, this.acc);
            this.vel.mult(0.99).limit(2);
        }
        this.pos = p5.Vector.add(this.pos, this.vel);
        if (this.pos.x > width / 2) {
            this.pos.x -= width;
        } else if (this.pos.x < -width / 2) {
            this.pos.x += width;
        }
        if (this.pos.y > height / 2) {
            this.pos.y -= height;
        } else if (this.pos.y < -height / 2) {
            this.pos.y += height;
        }
    }

    show()
    {
        push();
        stroke(fg);
        strokeWeight(1);
        noFill();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() - PI / 2);
        triangle(0, 2 * this.size / 3, this.size / 4, -this.size / 3, -this.size / 4, -this.size / 3);
        pop();
      }
}
