import mongoose, { ConnectOptions, ClientSession, startSession } from "mongoose"


// const dbConnect = async () => {

    // db연결 함수
    // const connect = async () => {
    //     console.log("몽고 DB 연결 시작", process.env.COMMON_ENV)

    //     mongoose.set('debug', true);

        // const db = await mongoose.connect(process.env.DB_ADRESS,{
        //     dbName : process.env.DB_NAME,
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //         useCreateIndex: true,
        //         retryWrites: false
        // } as ConnectOptions).catch(e => console.log("mongoose connect error!", e))

        
    // }

    // // db 연결함수
    // connect();
    // const db = mongoose.createConnection(process.env.DB_ADRESS,{
    //     dbName : process.env.DB_NAME,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     retryWrites: false
    // } as ConnectOptions).asPromise();

    // return db

    // return new Promise(function (resolve, reject) {
    //     mongoose.createConnection(process.env.DB_ADRESS,{
    //         dbName : process.env.DB_NAME,
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     } as ConnectOptions).asPromise(); 
    // })
// }

// const db = dbConnect();

// export default db



const dbConnect = () => {

    // db연결 함수
    const connect = () => {
        console.log("몽고 DB 연결 시작", process.env.COMMON_ENV)

        mongoose.set('debug', true);

        mongoose.connect(process.env.DB_ADRESS,{
            dbName : process.env.DB_NAME,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
                retryWrites: false
        } as ConnectOptions).catch(e => console.log("mongoose connect error!", e))

    // db 연결함수
    }
    connect();
}


export default dbConnect;