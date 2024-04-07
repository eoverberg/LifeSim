const {Entity} =require('./Entity');

class Obstacle extends Entity {
    constructor(x_pos_,y_pos_,radius_,lifetime_, diameter_) {
        super(x_pos_,y_pos_,radius_,lifetime_);
        this.diameter = diameter_; // Obstacle size, could allow entities to go around it
    }
}

module.exports = Obstacle;