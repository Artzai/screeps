var minCreeps = require('minCreeps');

StructureSpawn.prototype.spawnCreepsIfNecessary = function (spawn) {
	var unassignedSources = findUnassignedSources(spawn);

	if (unassignedSources) {
		var body = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE];

		unassignedSources.forEach((source) => {
			createCreep(body, 'miner', source, spawn)
		});
	} else {
		let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
		let numberOfCreeps = {};

        for (let role in minCreeps) {
            numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
        }

        if (numberOfCreeps['mule'] < minCreeps['mule']) {
        	createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'mule',undefined,spawn);
        } else if (numberOfCreeps['repairer'] < minCreeps['repairer']) {
        	createCreep([CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE],'repairer',undefined,spawn);
       	} else if (numberOfCreeps['builder'] < minCreeps['builder']) {
        	createCreep([CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE],'builder',undefined,spawn);
       	} else if (numberOfCreeps['upgrader'] < minCreeps['upgrader']) {
        	createCreep([CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE],'upgrader',undefined,spawn);
       	}
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
	if (source != undefined) {
		spawn.createCreep(body,name,{role: role, sourceID: source.id});
	} else {
		spawn.createCreep(body,name,{role: role, working: false});
	}
	//console.log(spawn.name+" spawned "+name+".");
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