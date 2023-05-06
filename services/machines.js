import db from '../models';

class Machines {
    async createMachines(data) {
        try {
            const machine = await db.Machines.create(data);
            return machine
        } catch (error) {
            throw error
        }
    }

    async getMachines(){
        try {
            const machine  = await db.Machines.findAll({
                where: {isDelete: false}
            });
            return machine;
        } catch (error) {
            throw error
        }
    }

    async getMachine(id){
        try {
            const machine  = await db.Machines.findAll({
                where: {isDelete: false, id},
                include: [{ all: true, nested: true }], 
            });
            return machine;
        } catch (error) {
            throw error
        }
    }

    async addParts(data){
        try {
            const parts = await db.Parts.create(data);
            return parts
        } catch (error) {
            throw error
        }
    }
}

export default Machines;