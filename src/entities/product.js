class Product {
    constructor(codProduct, name, category, expirationDate, type) {
        this._codProduct = codProduct
        this._name = name
        this._category = category
        this._expirationDate = expirationDate;
        this._type = type
    }

    get codProduct() {
        return this._codProduct;
    }

    set codProduct(value) {
        this._codProduct = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get expirationDate() {
        return this._expirationDate;
    }

    set expirationDate(value) {
        this._expirationDate = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}
module.exports = {Product};