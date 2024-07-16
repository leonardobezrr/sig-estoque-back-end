import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export const validateCNPJ = (value: string) => {
    if (!cnpjValidator.isValid(value)) {
        throw new Error('CNPJ inválido');
    }

    return value;
};

export const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

    if (!phoneRegex.test(value)) {
        throw new Error('Número de telefone inválido');
    }

    return value;
};
