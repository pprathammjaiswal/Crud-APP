const ProductModel = require('../models/pdtModel');
const CategoryModel = require('../models/catModel');

const showProduct = async (req, res) =>
{
    const ans_count = await ProductModel.countDocuments();
    const ans_product = await ProductModel.aggregate([
        {
            // Lookup means in joins
            "$lookup": {
                // Local field
                "let": { "catid": { "$toObjectId": "$catid" } },
                "from": "categories",
                "pipeline": [
                    // It is primary field
                    { "$match": { "$expr": { "$eq": ["$_id", "$$catid"] } } }
                ],
                "as": "catvalues"
            }
        },
        { "$skip": 0 },
        { "$limit": 10 }
    ]);

    // console.log(ans_product);
    // console.log(ans_count);
    res.send({ ans_product, ans_count });
};

const insertProduct = async (req, res) =>
{
    try
    {
        const product = new ProductModel(req.body);
        const ans = await product.save();
        res.send(ans)
    }
    catch (err)
    {
        console.log(err);
    }
};

const selectProductById = async (req, res) =>
{
    const ans_product_by_id = await ProductModel.findById(req.params.id);
    const ans_cat = await CategoryModel.find();
    res.send({
        catRecord: ans_cat,
        productRec: ans_product_by_id
    });
};

const updateProduct = async (req, res) =>
{
    // console.log(req.body);
    // console.log(req.params);
    const ans_product = await ProductModel.findByIdAndUpdate(req.params.productid, req.body);
    res.send({ msg: true });
};

const deleteProduct = async (req, res) =>
{
    // console.log(req.params); 


    // console.log(req.params);

    const ans_product = await ProductModel.findByIdAndRemove(req.params.id);
    console.log(ans_product);
    res.send({ msg: true });
};





module.exports = {
    showProduct,
    insertProduct,
    updateProduct,
    selectProductById,
    deleteProduct
};