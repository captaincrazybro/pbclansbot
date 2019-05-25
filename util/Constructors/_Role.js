const users = require('../../storage/permissions.json');
const Groups = require('../Enums/Groups.js');
const fs = require('fs');
const settings = require("../../settings.json");

module.exports = class _Role {

    constructor(id){
        let test = ""
        if(!users.roles){
            users.roles = {};
        }
        if(!users.roles[id]){
            users.roles[id] = {
                group: Groups.DEFAULT
            }
            fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
                if(err) console.log(err);
            })
        }
        if(!users.roles[id].perms){
            users.roles.perms = {
                commands: {}
            }
            fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
                if(err) console.log(err);
            })
        }
        this.id = id;
        this.bot = require("../../bot.js");
    }

    get getGroup(){
        return parseInt(users.roles[this.id].group);
    }

    hasCommadPerm(commandName){
        if(!users.roles[this.id].perms.commands[commandName] || users.roles[this.id].perms.commands[commandName] == false){
            return true;
        } else {
            return false;
        }
    }

    setGroup(group){
        users.roles[this.id].group = group;
        fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        })
    }

    setCommandPerm(commandName, boolean){
        users.roles[this.id].perms.commands[commandName] = boolean;
        fs.writeFile('./storage/permissions.json', JSON.stringify(users), (err) => {
            if(err) console.log(err);
        })
    }

    hasPermission(prop){
        return prop.help.permission <= this.getGroup || this.hasCommadPerm(prop.help.name);
    }

}