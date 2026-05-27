const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config({ path: "./.env" });

const connectDb = () => { mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected Successfuly"))
.catch(err => console.log(err));
}

module.exports = connectDb;