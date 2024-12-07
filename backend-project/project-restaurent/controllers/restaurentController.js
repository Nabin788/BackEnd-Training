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

const getRestaurent = async (req, res) => {
    try {
        const restaurent = await restaurentModel.find();
        if (!restaurent) {
            res.status(400).send({
                sucess: false,
                message: "restaurent not found"
            });
        }
        res.status(200).send({
            sucess: true,
            message: restaurent

        });
    } catch (error) {
        res.status(500).send({
            sucess: false,
            messsage: "failed to get restaurent"
        });
    }
}

const getRestaurentbyId = async(req, res) => {
    try {
        const restID = req.params.id;
        const restaurent = await restaurentModel.find(restID);
        if(!restaurent){
            res.status(400).send({
                sucess: false,
                messsage: "Restaurent not found"
            });
        }
        res.status(200).send({
            sucess: true,
            message: restaurent
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            sucess: false,
            message: "Failed to get restaurent"
        });
    }
}

module.exports = { restaurentController, getRestaurent, getRestaurentbyId };