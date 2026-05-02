import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('MongoDB URI is missing in .env file');
            process.exit(1);
        }

        // Mask password in log
        const maskedUri = uri.replace(/\/\/(.*):(.*)@/, '//***:***@');

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('--- MongoDB Connection Error ---');
        console.error(`Message: ${error.message}`);
        console.error(`Code: ${error.code}`);
        if (error.message.includes('bad auth')) {
            console.error('Suggestion: Check your database username and password in .env');
        }
        process.exit(1);
    }
};

export default connectDB;
