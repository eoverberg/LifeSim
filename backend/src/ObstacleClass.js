import entity from './entity'

class Obstacle extends entity {
    constructor(xPos,yPos,zPos,lifeTime, diameter) {
        super(xPos,yPos,zPos,lifeTime);
        this.diameter = diameter; // Obstacle size, could allow entities to go around it
        this.height = zPos;
    }
}

module.exports = Obstacle;