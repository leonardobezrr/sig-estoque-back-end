import { beforeEach, describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { createSupplier } from './create'

// Mock do serviço de criação de fornecedor
vi.mock('../../../services/factories/supplier/make-create-supplier-service', () => ({
    makeCreateSupplierService: () => ({
        handle: vi.fn().mockResolvedValue({
            supplier: {
                id: '123',
                social_name: 'Supplier 1',
                company_name: 'Company 1',
                phone_number: '9876543210',
                cnpj: '12345678000100'
            }
        })
    })
}));

describe('createSupplier Controller', () => {
    let fastify: Fastify;

    beforeEach(() => {
        fastify = Fastify();
        fastify.post('/suppliers', createSupplier);
    });

    it('should create a new supplier and return it', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/suppliers',
            payload: {
                social_name: 'Supplier 1',
                company_name: 'Company 1',
                phone_number: '9876543210',
                cnpj: '12345678000100'
            }
        });

        expect(response.statusCode).toBe(201);
        expect(response.json()).toEqual({
            supplier: {
                id: '123',
                social_name: 'Supplier 1',
                company_name: 'Company 1',
                phone_number: '9876543210',
                cnpj: '12345678000100'
            }
        });
    });

    it('should return a 400 error if validation fails', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/suppliers',
            payload: {
            }
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toHaveProperty('message');
    });
});
