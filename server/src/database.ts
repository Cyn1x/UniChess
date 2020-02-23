import mongoose from 'mongoose';

const initialiseDB = () => {
    const DB_URI = `${process.env.DB_URL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}/${process.env.DB_PARAMS}`;

    mongoose.connect(
        DB_URI,
        { useNewUrlParser: true,
        useUnifiedTopology: true }, 
        () => console.log('[Server]: Connected to database')
    );
}

export default initialiseDB;
