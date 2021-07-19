class Vehicle
{
    constructor()
    {
        this.orientation = 0;
        this.mass        = 1;
        this.max_speed   = 5;
        this.max_force   = 0.25;
        this.arrival_r   = 100;
        this.position    = createVector();
        this.velocity    = createVector();
    }

    seek(target_pos)
    {
        let offset = p5.Vector.sub(target_pos, this.position);
        let dist = offset.mag();
        let ramped = this.max_speed * dist / this.arrival_r;
        let clipped = min(ramped, this.max_speed);
        return offset.limit(clipped);
    }

    flee(target_pos)
    {
        return this.seek(target_pos).mult(-1);
    }

    pursue(moving_target)
    {
        //
    }

    update(desired_velocity)
    {
        // Newton
        let steering_force = p5.Vector.sub(desired_velocity, this.velocity).limit(this.max_force);
        let acceleration = p5.Vector.div(steering_force, this.mass);

        // Euler
        this.velocity = p5.Vector.add(this.velocity, acceleration).limit(this.max_speed);
        this.position = p5.Vector.add(this.position, this.velocity);

        // Eyes front
        if (this.velocity.x || this.velocity.y) {
            this.orientation = this.velocity.heading();
        }

        // Wrap around
        if (this.position.x > width / 2) {
            this.position.x -= width;
        } else if (this.position.x < -width / 2) {
            this.position.x += width;
        }
        if (this.position.y > height / 2) {
            this.position.y -= height;
        } else if (this.position.y < -height / 2) {
            this.position.y += height;
        }
    }

    show()
    {
        push();
        stroke(fg);
        strokeWeight(1);
        noFill();
        translate(this.position.x, this.position.y);
        rotate(this.orientation - PI / 2);
        triangle(0, 16 * this.mass, 6 * this.mass, -8 * this.mass, -6 * this.mass, -8 * this.mass);
        pop();
      }
}
