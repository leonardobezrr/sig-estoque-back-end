import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../repositories/in-memory/in-memory-products-repository";
import { FetchAllProductService } from "./fetch-all-product";

const dummySupplierId = 'dummy-supplier-id';

let productRepository: InMemoryProductsRepository;
let sut: FetchAllProductService;

describe('Fetch All Product Service', () => {
    beforeEach(() => {
        productRepository = new InMemoryProductsRepository();
        sut = new FetchAllProductService(productRepository);
    });

    it('should be able to fetch all products', async () => {
        await productRepository.create({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            quantity_in_stock: 10,
            batch: 'ABC123',
            supplier: {
                connect: {
                    id: dummySupplierId
                }
            }
        });

        await productRepository.create({
            name: 'Product 2',
            description: 'Product 2 description',
            price: 200,
            quantity_in_stock: 20,
            batch: 'DEF456',
            supplier: {
                connect: {
                    id: dummySupplierId
                }
            }
        });

        const result = await sut.execute();
        const products = result.product;

        expect(products).toHaveLength(2);
        expect(products[0]).toHaveProperty('name', 'Product 1');
        expect(products[1]).toHaveProperty('name', 'Product 2');
    });
});
