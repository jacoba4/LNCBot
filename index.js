const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});
var guilds = bot.guilds;
var guild;
var created = false;
var parented = false;


//Checks the time and if it is in the desired range, creates and parents the channel
//Will delete if outside of time range
function timeTest(){
    //Get current hour
    var date = new Date();
    var hour = date.getHours();

    //Checks if the channel has been created but not yet parented
    if(!parented && created){
        //Finds channel
        const channel = guild.channels.find(channel => channel.name === "Late Night Club");
        if(!channel)
        {
            console.log("No channel reference");
        }
        else{
            channel.setParent(botconfig.parentcategory);
        }
        parented = true;
        console.log("parented at " + hour);
    }

    //Checks if in desired range and channel has not yet been created
    if(hour >= botconfig.start && hour < botconfig.end && !created)
    {
        console.log("created LNC channel at " + hour);
        guild.createChannel("Late Night Club","voice");
        created = true;
    }

    //Checks if it is time to delete the channel
    if(hour >= botconfig.end)
    {
        //Find the channel
        for(var i = 0; i < guild.channels.array().length; i++)
        {
            if(guild.channels.array()[i].name === "Late Night Club")
            {
                //And delete it
                console.log("deleted LNC channel at " + hour);
                guild.channels.array()[i].delete();
                break;
            }
        }
        created = false;
        parent = false;
    }
    
}

bot.on("ready", async () => {
    //Set guild to first in array
    //When implementing make sure LNC Bot is only in one server
    guild = guilds.array()[0];
    console.log(`${bot.user.username} is online!`);

    //Calls timetest immediately and every second
    timeTest();
    var v = setInterval(timeTest,1000);
    
});


//Unused function to handle commands
/*
bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);    
});*/

bot.login(botconfig.token);