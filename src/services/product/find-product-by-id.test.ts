import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../repositories/in-memory/in-memory-products-repository";
import { FindProductByIdService } from "./find-product-by-id";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InactiveError } from "../errors/inactive-error";

let productRepository: InMemoryProductsRepository;
let sut: FindProductByIdService;

describe('Fetch Product By Id Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        sut = new FindProductByIdService(productRepository);
    });

    it('should be able to fetch product by id', async () => {
        const createdProduct = await productRepository.create({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            quantity_in_stock: 10,
            batch: 'ABC123',
            supplierId: 'supplier-1', // Certifique-se de fornecer um supplierId
            is_active: true
        });

        const { product } = await sut.execute({
            productId: createdProduct.id
        });

        expect(product.id).toEqual(createdProduct.id);
    });

    it('should not be able to fetch product with wrong id', async () => {
        await expect(() =>
            sut.execute({
                productId: 'non-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to fetch inactive product', async () => {
        // Cria um produto e marca como inativo
        const createdProduct = await productRepository.create({
            name: 'Inactive Product',
            description: 'This product is inactive',
            price: 650,
            quantity_in_stock: 8,
            batch: 'XYZ456A',
            supplierId: 'supplier-2', // Certifique-se de fornecer um supplierId
            is_active: true // Define o produto como ativo inicialmente
        });

        // Marca o produto como inativo
        await productRepository.inactivate(createdProduct.id);

        // Tenta buscar o produto inativo
        await expect(() =>
            sut.execute({
                productId: createdProduct.id
            })).rejects.toBeInstanceOf(InactiveError);
    });
});