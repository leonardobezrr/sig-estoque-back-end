import { Prisma, User } from "@prisma/client"
import { UserRepository } from "../user-repository"
import { randomUUID } from "crypto"

export class InMemoryUsersRepository implements UserRepository {
  update(user: Prisma.UserCreateInput): Promise<User> {
    throw new Error("Method not implemented.")
  }
  public items: User[] = []

  async findById(id: string) {
      const user = this.items.find((item) => item.id === id)

      if (!user) {
          return null
      }

      return user
  }

  async findByEmail(email: string) {
      const user = this.items.find((item) => item.email === email)

      if (!user) {
          return null
      }

      return user
  }

  async create(data: Prisma.UserCreateInput) {
      const user =  {
          id: randomUUID(),
          name: data.name,
          email: data.email,
          role: data.role,
          password_hash: data.password_hash,
      }

      this.items.push(user)

      return user
  }
}