import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log(`MongodB is connected`);
    } catch (error) {
        console.log(`Error while connecting to mongodb ${error.message}`);
        process.exit(1);

    }
};


export default ConnectDB