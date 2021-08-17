const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Nami";

class UserDB {
  constructor() {
    this.User = require("../schemas/user.js");
    const connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", function () {
      console.log("Connected to MongoDB");
    });

    // Connection to MongoDB on initialization
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async addUser(user) {
    let newUser = new this.User(user);
    newUser.save((err, user) => {
      if (err) return console.error(err);
      console.log(`Added ${user.username} to database.`);
    });
  }

  async findUser(user) {
    return await this.User.findOne({ username: user });
  }

  async updateUser(user, toUpdate) {
    await this.User.updateOne({ username: user }, toUpdate);
  }
}

class WorldDB {
  constructor() {
    this.World = require("../schemas/world.js");
    const connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", function () {
      console.log("Connected to MongoDB");
    });

    // Connection to MongoDB on initialization
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async initWorld(name, status, topFloor) {
    let newWorld = new this.World({
      name: name,
      status: status,
      floorsCompleted: 0,
      topFloor: topFloor,
    });
    newWorld.save((err, world) => {
      if (err) return console.error(err);
      console.log(`Added ${world.name} that is ${world.status} with a maximum of ${world.topFloor} to database.`);
    });
  }

  async getWorldStatus() {
    return await this.World.find({});
  }

  async completeFloor() {
    await this.World.updateOne({}, { $inc: { floorsCompleted: 1 } });
  }
}

module.exports = {
  UserDB,
  WorldDB,
};
