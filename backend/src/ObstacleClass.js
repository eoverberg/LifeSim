const {Entity} =require('./Entity');

class Obstacle extends Entity {
    constructor(x_pos_,y_pos_,radius_,lifetime_, height_) {
        super(x_pos_,y_pos_,radius_,lifetime_);
        this.m_height = height_; 
    }
}

module.exports = Obstacle;