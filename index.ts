// console.clear();
require("dotenv").config();
import Nami from "./classes/nami";

new Nami(process.env.DISCORD_TOKEN);

// to invite bot `https://discord.com/api/oauth2/authorize?client_id=912283963362508850&permissions=8&scope=applications.commands%20bot`