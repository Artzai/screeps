require('prototype.creep');
require('prototype.spawn');

module.exports.loop = function() {

	for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

	for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    for (let name in Game.creeps) {
        Game.creeps[name].runRole();
    }

    for (let spawnName in Game.spawns) {
        Game.spawns[spawnName].spawnCreepsIfNecessary(Game.spawns[spawnName]);
    }
    
};