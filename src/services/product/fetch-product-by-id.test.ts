import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../repositories/in-memory/in-memory-products-repository";
import { FindProductByIdService } from "./find-product-by-id";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

// Supondo que você tem um fornecedor fictício com um ID para teste
const dummySupplierId = 'dummy-supplier-id';

let productRepository: InMemoryProductsRepository;
let sut: FindProductByIdService;

describe('Fetch Product By Id Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        sut = new FindProductByIdService(productRepository);
    });

    it('should be able to fetch product by id', async () => {
        // Criação de produto com supplierId
        const createdProduct = await productRepository.create({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            quantity_in_stock: 10,
            batch: 'ABC123',
            supplierId: dummySupplierId  // Adicionado supplierId
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
});
