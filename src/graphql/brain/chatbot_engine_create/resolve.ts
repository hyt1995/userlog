import mongoose from "mongoose"
import engineModel from "../../../models/engine"
import { create_engine_format } from "../../../util/chat_bot_params"


export default {
    Mutation : {
        chatbot_engine_create : async (_, args) => {

            const session = await mongoose.startSession()
            session.startTransaction();
            
            try {

                const params = args

                const { name, notation, language } = params

                // _을 기준으로 분리
                const name_split = name.split("_")
                // 이름에 _가 없을 경우
                if(name_split.length < 2){
                    throw new Error("엔진 이름 에러")
                }

                // 이름에 gbu gbi가 없다
                if(!["gbu", "gbi"].includes(name_split[0])){
                    throw new Error("엔진 이름 에러")
                }

                // notation 검사
                if(name_split[0] === "gbu" && !notation.includes("의도 분류")){
                    console.log(notation)
                    throw new Error("notation 의도 분류 넣으셔야합니다.")
                }

                if(Array.isArray(language) === true && language.length !== 1){
                    throw new Error("language 다시 확인해주세요")
                }

                params.data = name_split[0] === "gbu" ?  {"utter": ""} : {"intent" : ""}

                params.version = args.version ? args.version : "1.0.0"
                params.owner = args.owner ? args.owner : "maumAI"

                // 데이터 형식화
                const result = create_engine_format(params)

                const new_engine = new engineModel(result)
                const result_save_engine : any = await new_engine.save()
                
                await session.commitTransaction();

                session.endSession();

                return result_save_engine

            } catch (e) {
                console.log("챗봇 등록 에러 ::::", e)

                await session.abortTransaction();
                session.endSession();
                return  "falid" + e.message
            }
        }
    }
}













// input inputObj {
//     name: String!
//     notation: String!
//     small_category: String!
//     owner: String!
//     kind: String!
//     base_url: String!
//     end_point: String!
//     method: String!
//     description: String!
//     support: { 
//       input_file: [],
//       output_file: [],
//       language: [1],
//       sample_rate: []
//     },
//     host : Int!
//     chatbot_builder_lan : [Int!]
//     open_to: [String], 
//     is_active: Boolean,
//   }


// type returnStr {
//     name : String!
//     action_name : String!
//     speaker_name : String!
// }


// type Mutation {
//   readValue(
//     excel_num : [String!]
//     fix_ex_num : [String!]
//     ea_num : Int!
//     file_name : String!
//     ko_KR : String!
//     en_US : String!
//     supported_language : [Int]
//     sample_rate : Int
//     is_active : Boolean
//     speaker_name : String!
//   ): [returnStr]
// }