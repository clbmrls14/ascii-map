class Item {
    title;
    description;
    isWeapon;
    damage;
    value;

    constructor(title, description, isWeapon, damage = 0, value) {
        this.title = title;
        this.description = description;
        this.isWeapon = isWeapon;
        this.damage = damage;
        this.value = value;
    }

    rollDamage = () => Math.floor(Math.random() * this.damage + 1);
}

module.exports = { Item };
