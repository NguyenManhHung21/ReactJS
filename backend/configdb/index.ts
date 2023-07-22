import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            //thiết lập kết nối tới CSDL
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any).then(() =>console.log('DB connection successfully!'))
    } catch (error: any) {
        console.log(error.message)
    }
}
