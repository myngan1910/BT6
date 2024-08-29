const {PrismaClient, Prisma} = require('@prisma/client');
const login = require('../controller/loginController');
const client = new PrismaClient();

module.exports = {
    postLogin: async(name) =>{
        const pass = await client.users.findMany({
            where: {name: name},
            select: {
                id: true,
                name: true,
                pass: true
            }
        })
        return pass;

    }
}