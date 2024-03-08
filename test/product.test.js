const {Product} = require("../src/entities/product");

describe('Product testing', () => {
    let product;

    beforeEach(() => {
        product = new Product('00001', 'Spaghetti', 'Pasta', '01-01-2025', '40', 'NoRefrigerated');
    });

    it('should return the correct codProduct', () => {
        expect(product.codProduct).toBe('00001');
    });

    it('should return the correct name', () => {
        expect(product.name).toBe('Spaghetti');
    });

    it('should return the correct category', () => {
        expect(product.category).toBe('Pasta');
    });

    it('should return the correct expiration date', () => {
        expect(product.expirationDate).toBe('01-01-2025');
    });

    it('should return the correct stock', () => {
        expect(product.stock).toBe('40');
    });

    it('should return the correct type', () => {
        expect(product.type).toBe('NoRefrigerated');
    });
});