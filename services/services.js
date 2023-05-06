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
}

export default Services;