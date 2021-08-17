const { UserDB } = require("./mongodb.js");

class User {
  constructor() {
    this.userDB = new UserDB();
  }

  async getUserProfile(user) {
    this.returned = await this.userDB.findUser(user)
    this.profile = {
      _id: this.returned._id,
      username: this.returned.username,
      points: this.returned.points,
      guild: this.returned.guild,
      party: this.returned.party
    }
    return this.profile;
  }

  async getUserInventory(user) {
    return await this.userDB.findUser(user);
  }

  async addUserToDB(author) {
    const user = {
      _id: author.id,
      username: author.username,
      points: 0,
      guild: {
          inGuild: false,
          guildId: 0,
      },
      party: {
          inParty: false,
          partyId: 0,
      },
      inventory: {
          weapons: [],
          armors: [],
          items: [],
          skills: [],
      },
    };
    await this.userDB.addUser(user);
  }
}

module.exports = User;
