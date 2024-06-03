const dotenv = require('dotenv')
const {addProduct, getProducts, getProductById, updateProductById, deleteProductById} = require("../src/services/productServices")
const {connectDB, disconnectDB, collections, db} = require("../src/config/dbConnection")
const {MongoClient} = require("mongodb")
const path = require("path")
const fs = require("fs")

dotenv.config()
const password = process.env.PASSWORD_USER_TEST
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
};

describe('Product services testing', () => {

    beforeAll(async () => {
        await connectDB(process.env.DB_NAME_TEST_SERVICES)
    });

    beforeEach(async () => {
        await collections.products.deleteMany()
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.Product.json')
        const productData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        await collections.products.insertOne(productData)
    });

    it('it should return 401 if the data are invalid', async () => {
        const res = mockResponse()
        const req = {
            body: {
                _codProduct: '00001',
                _name: "",
                _category: "",
                _expirationDate: "",
                _type: ""
            }
        };

        await addProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid product data'})
    });

    it('it should return 401 if the data are missing', async () => {
        const res = mockResponse()
        const req = {
            body: {
                _codProduct: '00001',
                _name: ""
            }
        };

        await addProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request body. Please ensure all required fields are included and in the correct format.'})
    });

    it('it should return 200 if creation is successful', async () => {
        const res = mockResponse()
        const req = {
            body: {
                _codProduct: '00005',
                _name: "Fusilli",
                _category: "Pasta",
                _expirationDate: "01-02-2026",
                _type: "NoRefrigerated"
            }
        };

        await addProduct(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    });

    it('it should return 401 if the product already exists', async () => {
        const res = mockResponse()
        const req = {
            body: {
                _codProduct: '00001',
                _name: "Spaghetti",
                _category: "Pasta",
                _expirationDate: "01-01-2025",
                _type: "NoRefrigerated"
            }
        };

        await addProduct(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Product already exists'})
    });

    it('it should return 200 and all products that are stored', async() => {
        const res = mockResponse()
        const req = {
            body: {}
        };

        await getProducts(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 200 and the product with the productCode specified', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "00001"
            }
        };

        await getProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if the productCode is wrong', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "02347"
            }
        };

        await getProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Product not found"})
    })

    it('it should return 401 if the productCode is not specified', async () => {
        const res = mockResponse()
        const req = {
            params: {
                _codProduct: ""
            }
        };
        await getProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid product data"})
    })

    it('it should return 200 and the product updated with a new category', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "00001"
            },
            body:{
                _category: "Fresco"
            }
        };

        await updateProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if updating product category with not exists product code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "02343"
            }, body:{
                _category: "Fresco"
            }
        };

        await updateProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Product not found"})
    })

    it('it should return 401 if updating product category without specified product code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: ""
            }, body:{
                _category: "Fresco"
            }
        };
        await updateProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid product data"})
    })

    it('it should return 200 and the product updated with a new name', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "00001"
            }, body:{
                _name: "Tagliatelle"
            }
        };

        await updateProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if updating name without correct product code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "023044"
            }, body:{
                _name: "Tagliatelle"
            }
        };

        await updateProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Product not found"})
    })

    it('it should return 200 and the code of the product that has been deleted', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "00001"
            }
        };

        await deleteProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if deleting user without correct product code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: "03242"
            }
        };

        await deleteProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Product not found"})
    })

    it('it should return 401 if deleting product without specified the product code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codProduct: ""
            }
        };
        await deleteProductById(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid product data"})
    })
});