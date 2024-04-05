export function isColliding(entity1, entity2) {
    const dx = entity1.m_x_pos - entity2.m_x_pos;
    const dy = entity1.m_y_pos - entity2.m_y_pos;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (entity1.size * entity2.size);
}