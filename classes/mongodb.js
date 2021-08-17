const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = "mongodb://localhost:27017/Nami";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

class UserDB {
  constructor() {
    this.schema = new Schema({
      _id: { type: Number, required: true, unique: true },
      username: { type: String, required: true },
      points: { type: Number, default: 0 },
    });

    this.User = mongoose.model("User", this.schema);
  }
  
  async addUser(user) {
    let newUser = new this.User(user);
    newUser.save((err, user) => {
      if (err) return console.error(err);
      console.log(`Added ${user.username} to database.`);
    })
  }

  async findUser(user) {
    let returnedUser = await this.User.findOne({ username: user });
    console.log(returnedUser);
  }

  async updateUser(user, toUpdate) {
    await this.User.updateOne({username: user}, toUpdate);
  }
}

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function() {
  console.log("Connected to MongoDB");
});

// const userDB = new UserDB();
// userDB.addUser({points: 0, username: "cimok", _id: 165087303281147904});
// userDB.findUser("cimok");
// userDB.updateUser("cimok", {points: 500});