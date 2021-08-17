const { UserDB } = require("./mongodb.js");
const { MessageEmbed } = require("discord.js");

class User {
  constructor() {
    this.userDB = new UserDB();
  }

  async getUserProfile(user) {
    this.returned = await this.userDB.findUser(user)
    this.profile = {
      _id: this.returned._id,
      username: this.returned.username,
      points: this.returned.points
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
          armor: [],
          items: [],
          skills: [],
      },
    };
    await this.userDB.addUser(user);
  }
}

module.exports = User;
