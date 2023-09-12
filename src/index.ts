import express ,{Application, Request, Response, NextFunction } from "express"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import {graphqlHTTP} from "express-graphql"
import {buildSchema} from "graphql"
import {makeExecutableSchema }from "@graphql-tools/schema"
import schema from "./graphql/schema"
import connect from "./db/connect"

// dotenv.config(
//   {
//   path : path.resolve(
//     process.env.NODE_ENV === "development" 
//     ? '.development.env' : '.production.env' 
//   )
// }
// );

// dotenv 환경별로 다르게 가져가기
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '.production.env') })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '.development.env') })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

const app : Application = express();
const PORT = 5001;

connect()

// 허용 url
const whitelist = ["http://localhost:3000", "http://localhost:8000","http://127.0.0.1:3000", "http://127.0.0.1:8000"];
const corsOptions : cors.CorsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders : ['set-cookie'] // 쿠키를 클라이언트에 저장시키기 위해
}


// express 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
// app.use(morgan("dev"));
// app.use(helmet());


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// grpahql
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)


// router 세팅
app.get('/', (req: Request, res : Response) => {
  res.send('Hello World!')
})

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 시작했습니다잉 ${PORT}`)
  console.log("여기서 env확인해보기" + process.env.NODE_ENV + ":::::::"+process.env.COMMON_ENV)
})
