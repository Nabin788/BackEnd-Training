const category = require("../model/categorySchema.js");

const sendCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send("Please enter Title of the category.");
        }

        const newCategory = new category({
            title
        });
        await newCategory.save();
        res.status(201).send({
            sucess: true,
            message: "Category created sucessfully.",
            newCategory
        });
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Failed to send category."
        });
    }
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.staus(400).send("Please enter category id");
        }

        const getCategory = await category.findById(id);
        
        if (!getCategory) {
            return res.status(400).send({
                sucess: false,
                message: "Category not found"
            });
        }

        res.status(200).send({
            sucess: true,
            message: "list of category",
            getCategory
        });
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Category not found"
        });
    }
}

const updatesCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Id is required");
        }

        const getCategory = await category.findById(id);
        
        if (!getCategory) {
            return res.status(400).send({
                sucess: false,
                message: "Failed to get category"
            });
        }

        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(400).send("Please enter required data");
        }

        const newCategory = await category.findByIdAndUpdate(id, { title, imageUrl}, {new: true, runValidators: true});
        res.status(201).send({
            sucess: true,
            message: "Category updated sucessfully",
            newCategory
        });

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Failed to update category."
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryID = req.params.id;
        if (!categoryID) {
            res.status(400).send("Please enter food category ids");
        }
        const food = await category.findById(categoryID);
        if (!food) {
            res.status(400).send({
                sucess: false,
                message: "invalid id, food not found"
            });
        }

        await category.findByIdAndDelete(categoryID);
        res.status(200).send({
            sucess: true,
            message: "Food category deleted sucessfully."
        });
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Failed to delete food categoty."
        });
    }
}

module.exports = { sendCategory, deleteCategory, getCategory, updatesCategory };