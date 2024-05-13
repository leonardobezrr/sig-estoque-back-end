import '@fastify/jwt'

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            sub: string,
            role: 'EMPLOYEE' | 'MANAGER'
        }
    }
}