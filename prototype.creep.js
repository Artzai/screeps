var roles = {

    miner: require('role.miner'),
    mule: require('role.mule'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer')

};

Creep.prototype.runRole = function () {

    if (this.memory.role == undefined) {
        this.memory.role = 'miner';
    }
    roles[this.memory.role].run(this);

};

Creep.prototype.getEnergy = function (useContainer, useSource) {

    let container;

    if (useContainer) {
        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                         s.store[RESOURCE_ENERGY] > 0
        });

        if (container != undefined) {
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
            }
        }

    }

    if (container == undefined && useSource) {
        var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }

    }

};