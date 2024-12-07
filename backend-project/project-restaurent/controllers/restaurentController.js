const restaurentModel = require("../model/restaurentSchema.js");

const restaurentController = async (req, res) => {
    try {
        const { title, imageUrl, description, star, comment } = req.body;
        if (!title || !imageUrl || !description || !star) {
            res.status(400).send("Please Insert required Data");
        }

        const newRestaurent = new restaurentModel({
            title,
            imageUrl,
            description,
            star,
            comment
        });

        await newRestaurent.save();
console.log("Check 3");

        res.status(200).send({
            sucess: true,
            message: "Sucessfully get restaurent data."
        });

    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: "Failed to get restaurent data."
        });
    }
}

module.exports = restaurentController;