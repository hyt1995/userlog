// import writeXlsxFile  from "write-excel-file"
// import fs from "fs"
// // import fsff from "../../../../../../../"

// const HEADER_ROW = [
//     {
//       value: "Name",
//       fontWeight: "bold",
//     },
//     {
//       value: "Birth",
//       fontWeight: "bold",
//     },
//     {
//       value: "phone",
//       fontWeight: "bold",
//     },
//     {
//       value: "region",
//       fontWeight: "bold",
//     },
// ];
  
// const DATA_ROW_1 = [
//     // "Name"
//     {
//         type: String,
//         value: "oh",
//     },

//     // "Birth"
//     {
//         type: Date,
//         value: new Date(),
//         format: "mm/dd/yyyy",
//     },

//     // "Phone"
//     {
//         type: Number,
//         value: 1012345678,
//     },

//     // "Region"
//     {
//         type: String,
//         value: "Seoul",
//     },
// ];

// const data = [HEADER_ROW, DATA_ROW_1];

// // const pathOne = "../../../../../../../excel"
// const path = "./excel"



// export default {
//     Mutation : {
//         readValue : async (_, args) => {
            
//             try {
//                 console.log("11111 :::", args)

//                 // 엑셀
//                 if(!fs.existsSync(path)){
//                     fs.mkdirSync(path)
//                 }
//                 await writeXlsxFile(data, {
//                     filePath: "./excel/member.xlsx",
//                   });

//                 return "save success"
//             } catch (e) {
//                 console.log("엑셀 값읽기 에러 ::::", e)
//                 return {
//                     code : 0,
//                     message : "falid"
//                 }
//             }
//         }
//     }
// }