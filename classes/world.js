const { WorldDB } = require("./mongodb.js");

class World {
    constructor() {
        this.worldDB = new WorldDB();
    }

    async initWorld(name, status, maxFloor) {
        await this.worldDB.initWorld(name, status, maxFloor);
    }

    async getStatus() {
        return await this.worldDB.getWorldStatus();
    }

    async completeFloor() {
        await this.worldDB.completeFloor();
    }
}

module.exports = World;