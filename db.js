
import mongoose from "mongoose"
import 'dotenv/config'

const connectToDB = () => {

    // mongodb+srv://psr1983:67Y2NyqRdSTHr0mZ@cluster0.jg6xd2k.mongodb.net/ecommerce_app_db?appName=Cluster0
    const dbUrl = process.env.MONGO_DB_URL;

    console.log(`MONGO_DB_URL is ${dbUrl}`)

    if (!dbUrl) {
        console.log("MONGO_DB_URL is not defined")
        process.exit()
    } else {

        // mongoose.set("strictQuery", true, "useNewUrlParser", true);

        const connectToDBHandler = async () => {
            await mongoose.connect(dbUrl, { useNewUrlParser: true })
                .then( (res) => {
                    console.log("MongoDB is Connected...");
                })
                .catch((error) => {
                    console.log(error)
                    process.exit(1);
                })

        }

        connectToDBHandler()
    }

}

export { connectToDB }
