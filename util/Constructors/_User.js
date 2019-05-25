const users = require('../../storage/permissions.json');
const Groups = require('../Enums/Groups.js');
const fs = require('fs');
const settings = require("../../settings.json");

module.exports = class _User {

    constructor(id){
        if(!users.users){
            users.users = {};
        }
        if(!users.users[id]){
            users.users[id] = {
                group: Groups.DEFAULT
            }
            fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
                if(err) console.log(err);
            })
        }
        if(!users.users[id].perms){
            users.users.perms = {
                commands: {}
            }
            fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
                if(err) console.log(err);
            })
        }
        if(settings.owners.includes(id)){
            users.users[id] = {
                group: Groups.OWNER
            }
            fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
                if(err) console.log(err);
            })
        } 
        this.id = id;
        this.bot = require("../../bot.js").bot;
    }

    get getGroup(){
        return parseInt(users.users[this.id].group);
    }

    hasCommadPerm(commandName){
        if(!users.users[this.id].perms.commands[commandName] || users.users[this.id].perms.commands[commandName] == false){
            return true;
        } else {
            return false;
        }
    }

    setGroup(group){
        users.users[this.id].group = group;
        fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        })
    }

    setCommandPerm(commandName, boolean){
        users.users[this.id].perms.commands[commandName] = boolean;
        fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        })
    }

    hasPermission(prop){
        return prop.help.permission <= this.getGroup || this.hasCommadPerm(prop.help.name);
    }

}