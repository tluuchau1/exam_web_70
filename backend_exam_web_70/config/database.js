import mongoose from "mongoose";

const Mongo_Url = `mongodb+srv://tluuchau1:siunhanheo1@exam.9vrsacl.mongodb.net/`;

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(Mongo_Url);
    console.log(`Database is connected at ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
