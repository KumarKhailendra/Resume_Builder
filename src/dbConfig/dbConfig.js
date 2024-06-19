import mongoose from "mongoose";

export async function mongooseConnect(){
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }else{
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todo_project";

        try {
            console.log('MongoDB connected successfully');
            return await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 30000, 
                maxPoolSize: 50,
                socketTimeoutMS: 60000,
                family: 4
            });

        } catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1); // Exit the Node.js process with an error
        }
    }
}

