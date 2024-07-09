const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.MONGO_URI, connectionParams)
            .then(() => {
                console.log("Connected to database successfully");
            })
            .catch((error) => {
                console.error("Error connecting to database:", error);
            });
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database!");
    }
};
