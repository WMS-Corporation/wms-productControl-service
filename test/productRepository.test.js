const {createProduct, findProductById, findProducts, modifyProduct, deleteProduct} = require("../src/repositories/productRepository")
const {connectDB, collections, closeDB} = require("../src/config/dbConnection")
const {Product} = require("../src/entities/product")
const path = require("path")
const fs = require("fs")

describe('productRepository testing', () => {
    beforeAll(async () => {
        await connectDB(process.env.DB_NAME_TEST_REPOSITORY)
    });

    beforeEach(async () => {
        await collections.products.deleteMany()
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.Product.json')
        const productData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        await collections.products.insertOne(productData)
    });
    afterAll(async () => {
        await closeDB()
    });

    it("should create a new product", async () => {
        const result = await createProduct(new Product("00002", "Penne", "Pasta", "21-02-2026", "0", "NoRefrigerated"))
        expect(result).toBeDefined()
    })

    it('should find a product by codProduct', async () => {
        const product = await findProductById("00001")
        expect(product._name).toEqual("Spaghetti")
        expect(product._category).toEqual("Pasta")
    });

    it('should return null if PRODUCT is not found', async () => {
        const code = 'nonexistentproduct'
        const product = await findProductById(code)
        expect(product).toBeNull()
    });

    it('should return all the product', async() => {
        const result = await findProducts()
        expect(result.length).toEqual(await collections.products.countDocuments())
    })

    it('should return an updated product with new name', async() => {
        const filter = { _codProduct: "00001" }
        const update = { $set: { _name: "Farfalle" } }

        const updatedProduct = await modifyProduct(filter, update)
        expect(updatedProduct._name).toEqual("Farfalle")
    })

    it('should return null if the filter is not correct', async() => {
        const filter = { _codUser: "" }
        const update = { $set: { _name: "Tagliatelle" } }

        const updatedProduct = await modifyProduct(filter, update)
        expect(updatedProduct).toBeNull()
    })

    it('should return null if the product has been deleted', async() => {
        const productCode = '00001'
        await deleteProduct(productCode)
        const deletedProduct = await findProductById(productCode)
        expect(deletedProduct).toBeNull()
    })
});