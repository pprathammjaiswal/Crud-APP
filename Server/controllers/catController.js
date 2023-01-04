const categoryModel = require('../models/catModel');

const showCategory = (req, res) =>
{
    // console.log(req.body);
    try
    {
        categoryModel.find({}, (err, data) =>
        {
            if (!err)
                res.send(data);
        });
    }
    catch (err)
    {
        console.log(err);

    }

};

const insertCategory = async (req, res) =>
{
    try
    {
        const category = new categoryModel(req.body);
        const ans = await category.save();
        res.send(ans);
    }
    catch (err)
    {
        console.log(err);
    }
}

const selectCategoryById = async (req, res) =>
{
    console.log(req.params);
    const { id } = req.params;
    try
    {
        const ans = await categoryModel.findById(id);
        res.send(ans);
    }
    catch (err)
    {
        console.log(err);
    }
}

const updateCategory = async (req, res) =>
{
    // console.log(req.body);
    // console.log(req.params);
    const ans_product = await categoryModel.findByIdAndUpdate(req.params.categoryid, req.body);
    console.log(ans_product);
    res.send({ msg: true });
}

const deleteCategory = async (req, res) =>
{
    console.log(req.params);

    const ans_cat = await categoryModel.findByIdAndRemove(req.params.myid);
    console.log(ans_cat);
    res.send({ msg: true });
}
module.exports = {
    showCategory,
    insertCategory,
    updateCategory,
    selectCategoryById,
    deleteCategory
};