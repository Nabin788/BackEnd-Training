
const databaseConnection = (mongoose) => {
    mongoose.connect(process.env.URL).then(() => {
        console.log("Database is connected sucessfully");
    }).catch((err) => {
        console.error("Database is failed to connect.", err);
    });
}
module.exports = databaseConnection;

