import db from '../models';

class Services{
    async createService(data){
        try {
            const service = await db.Services.create(data)
        return service
        } catch (error) {
            throw error
        }
    }

    async assignUsers(data){
        try {
            const users = await db.UserService.bulkCreate(data);
            return users
        } catch (error) {
            throw error
        }
    }

    async markAsComplete({userId, servicesRolesId, servicesId}){
        console.log({userId, servicesRolesId, servicesId})
        try {
            const users = await db.UserService.update({
                status: true,
            }, {where:{
                userId, servicesRolesId, servicesId
            }})
            return users
        } catch (error) {
            throw error
        }
    }
}

export default Services;