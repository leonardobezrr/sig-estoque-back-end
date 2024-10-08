import { Product, Prisma } from '@prisma/client' 

export interface ProductRepository {
    create(data: Prisma.ProductCreateInput): Promise<Product>
    findMany(): Promise<Product[]>
    findManyByName(name: string): Promise<Product[]>
    findManyByIds(ids: string[]): Promise<Product[]>
    findById(id: string): Promise<Product | null>
    patch(id: string, data: Prisma.ProductUpdateInput): Promise<Product | null>
    inactivate(id: string): Promise<Product | null>
    reduceStock(productId: string, quantity: number): Promise<void>
    increaseStock(productId: string, quantity: number): Promise<void>
}