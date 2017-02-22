var minCreeps = require('minCreeps');

StructureSpawn.prototype.spawnCreepsIfNecessary = function (spawn) {
	var unassignedSources = findUnassignedSources(spawn);

	if (unassignedSources) {
		var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE];

		unassignedSources.forEach((source) => {
			createCreep(body, 'miner', source, spawn)
		});
	}

	//SPAWN MINIMUM CREEPS        minCreeps['miner'];
};

function findUnassignedSources(spawn) {
	var sources = spawn.room.find(FIND_SOURCES, {
		filter: (source) => !_.some(spawn.room.find(FIND_MY_CREEPS), 
			creep => creep.memory.sourceID == source.id)
	});

	return sources[0] ? sources : null;
}

function createCreep(body, role, source, spawn) {
	var name = assignName(role, spawn);
	spawn.createCreep(body,name,{role: role, sourceID: source.id});
	console.log(spawn.name+" spawned "+name+".");
}

function assignName(role, spawn) {
    var newName = undefined;

    while (newName == undefined) {
    	var name = getRandomRoleName(role);
    	if (!_.some(spawn.room.find(FIND_MY_CREEPS), creep => creep.name == name)) {
    		newName = name;
    	}
    }

    return newName; 
}

function getRandomRoleName(role) {
	return role+Math.floor((Math.random() * 10) + 1);
}