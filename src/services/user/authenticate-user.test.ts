import { beforeEach, describe, expect, it } from "vitest"
import { UserAuthenticateService } from "./user-authenticate"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository"
import { InvalidCredentialError } from "../errors/invalid-credential-error"

let usersRepository : InMemoryUsersRepository
let sut: UserAuthenticateService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new UserAuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'John Doe',
            role: 'MANAGER',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => 
            sut.execute({
                email: 'ricfilho00007@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialError);
            
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            role: 'MANAGER',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'johndoe@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialError);
            
    })
})