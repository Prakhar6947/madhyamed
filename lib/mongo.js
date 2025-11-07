import mongoose from "mongoose";

async function mongoConnect(database='madhyamed') {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}${database}`)
        if(mongoose.connection.readyState == 1){
            console.log('Databse connected! ')
        }
    }catch(err){
        console.log(err)
    }

}

export default mongoConnect