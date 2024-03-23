export function isColliding(entity1, entity2) {
    const dx = entity1.xPos - entity2.xPos;
    const dy = entity1.yPos - entity2.yPos;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (entity1.size * entity2.size);
}

