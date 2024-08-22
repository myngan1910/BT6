const {PrismaClient, Prisma} = require('@prisma/client');
const login = require('../controller/loginController');
const client = new PrismaClient();

module.exports = {
    postLogin: async(name) =>{
        const pass = await client.$queryRaw`SELECT id, name, pass FROM "users" WHERE name = ${name}  `
        return pass;

    }
}