import fs from "fs"
import path from "path"
import xlsx from "xlsx"
import mongoose from "mongoose"
import brainModel from "../../../../models/brain"
import avatar from "../../../../models/avatar"
import { make_saving_data} from "../../../../util/tts_params"


/// 랭귀지 번호에 따라 _cn, _jp 검사 추가하기


export default {
    Mutation : {
        readValue : async (_, args) => {

            const session = await mongoose.startSession()
            session.startTransaction();
            
            try {

                const {file_name, ea_num, excel_num, fix_ex_num} = args

                const filePath = path.join( __dirname, "..", "..", "..", "..", "..", "..", `${file_name}.xlsx`)
                const returnValue = xlsx.readFile(filePath)
                const firstSheetName = returnValue.SheetNames[0]

                const excel_data = returnValue.Sheets[firstSheetName]

                args.direction = excel_data[`${fix_ex_num[1]}`].v
                args.split_resol = [Number(excel_data[`${fix_ex_num[0]}`].v)]
            
                let newArray : string[][] = []

                for (let n = 0; n<ea_num; n++){
                    const result = excel_num.map(i => {
                        const reg = new RegExp(/[0-9 ]+/, "gi");
                        const spt = i.replace(reg, "")
                        const a = i.split(spt)
                        return spt + (Number(a[1]) + n) 
                    })
                    newArray.push(result)
                }

                const returnArray = newArray.map(i => {

                    return make_saving_data(excel_data, i, args)
                })

                const result = await avatar.insertMany(returnArray)

                await session.commitTransaction();

                session.endSession();

                const return_str = result.map(i => {
                    return {
                        name : i.name,
                        action_name : i.action[0].name,
                        speaker_name : i.tts_speaker_name
                    }
                })

                return return_str
                // 이름 + utterance + speakerName 

            } catch (e) {
                console.log("엑셀 값읽기 에러 ::::", e)

                await session.abortTransaction();
                session.endSession();
                return {
                    code : 0,
                    message : "falid" + e.message
                }
            }
        }
    }
}


// excel_num : [String!] // 데이터 있는 엑셀 위치
// fix_ex_num : [String!] // 고정된 데이터 엑셀 위치
// ea_num : Int! / 데이터 개수
// file_name : String! // 파일 이름
// ko_KR : String! // 한국 이름
// en_US : String! // 영어 이름
// supported_language : Int // 일단 1로 통일
// sample_rate : Int // 있으면 대체하기
// is_active : Boolean // 이것도 보통 true인데 있으면 대체
// speaker_name : String! // tts, stt speaker이름 오무완 수석님한테 물어보기