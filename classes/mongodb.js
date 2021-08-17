const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Nami";
const userSchema = require("../schemas/user.js");

class UserDB {
  constructor() {
    this.User = userSchema;
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

// const userDB = new UserDB("mongodb://localhost:27017/Nami");
// userDB.addUser({points: 0, username: "cimok", _id: 165087303281147904});
// userDB.findUser("cimok");
// userDB.updateUser("cimok", {points: 500});

module.exports = {
  UserDB,
};
