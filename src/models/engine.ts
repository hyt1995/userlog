'use strict';

import mongoose from "mongoose"
import { PROD_ENV } from "../lib/constants";

const Schema = mongoose.Schema

interface KeyRestrictionsType {
    [key : string] : any
  }


const engine = new Schema<KeyRestrictionsType>({

  name: { type: String, required: true, trim: true }, // 엔진 고유 name
  notation: { type: String, required: true, trim: true }, // 엔진 화면 표시 이름, 선택하는 창에서도 나오는 이름
  image_path: { type: String, required: false, trim: true, default: "" }, // engine 이미지 정보 존재 시 cloudfront url - 대부분 안쓴다고 한다.
  large_category: { // 엔진 대분류
    type: String,
    required: true,
    trim: true,
    // enum: ['thought', 'face', 'mouth', 'eyes', 'ears']
  },
  middle_category: { // 엔진 중분류
    type: String,
    required: true,
    trim: true,
    default: ""
    // enum: ['chatbot', 'stf', 'tts', 'stt']
  },
  small_category: { type: String, required: false, default: "" }, // 버전 별칭 // 엔진 소분류(현재 사용하지 않음)
  owner: { type: String, required: true, trim: true }, // 엔진 소유 회사 - 마음ai를 말한다
  version: { type: String, required: true, trim: true }, // 엔진 버전
  kind: { // 엔진 종류
    type: String,
    required: true,
    // enum: ['api', 'grpc', 'library']
  },
  base_url: { type: String, required: false, default: "" }, // 엔진 호출 base_url - 엔진서버 ip주소
  end_point: { type: String, required: false, default: "" }, // 엔진 호출 end_point
  method: { type: String, required: true }, // 엔진 호출 시 사용하는 함수 명
  auth: { type: Array, required: false, default: [] }, // 엔진 호출 시 인증이 필요한 경우, 인증 필요 값을 표기
  description: { type: String, required: false, default: 'engine description' }, // 엔진 설명
  input_type: { // 엔진 호출 시 input data type
    type: Array,
    required: true,
    // enum: ['text', 'audio', 'image', 'video']
  },
  output_type: { // 엔진 호출 시 output data type
    type: Array,
    required: true,
    // enum: ['text', 'audio', 'image', 'video']
  },
  support: { // 엔진 지원 데이터 정보
    type: {
      'input_file': { type: Array, required: false }, // png, jpg, wav, mp4
      'output_file': { type: Array, required: false }, // png, jpg, wav, mp4
      'language': { type: Array, required: false },
      'sample_rate': { type: Array, required: false },
    },
    _id: false,
    required: true
  },
  parameter: { // 엔진 호출 시 필요한 parameter, MD-AD-FE에서 엔진 데이터 호출 시 사용됨
    type: {
      'body': { type: Object, required: false }, // MD-AD-FE와 통신 시 사용, 미리보기 값을 가지고 있음
      // 'body': { type: Schema.Types.Mixed, required: false },
      'params': { type: Object, required: false }, // MD-AD-FE와 통신 시 사용, 사용자로부터 어떤 값을 받아야하는 지에 대한 데이터를 가지고 있음
      'query': { type: Object, required: false }, // 엔진 호출 시 query string 데이터가 필요하다면 작성, 사용하지 않는 경우 null
    },
    _id: false,
    required: true
  },
  open_to: { type: Array, required: true, default: [] }, // 일부 계정에 엔진을 공개해야할 때 사용  여기에 적혀져있는계정이름만 호출이 가능하다 보통 한회사에서만 쓸수있게 만들때 사용
  is_active: { type: Boolean, required: true, default: true }, // 엔진 사용 여부 보이는지 안보이는지 여부를 결정 
  return: { type: Object, required: false, default: {} }, //Schema.Types.Mixed // 엔진 output 형태에 대한 정의(현재 실질적으로 사용하지 않음)

  search: { type: String, required: true, trim: true, default: '' }, // MD-AD admin 페이지에서 엔진 검색 시 필요한 단어들을 기록

},

  {
    timestamps: {},
    autoIndex: PROD_ENV.indexOf(process.env.NODE_ENV) === -1 ? true : false,
    versionKey: false,
    minimize: false,
  });



if (PROD_ENV.indexOf(process.env.NODE_ENV) === -1) {
  engine.index({ name: 1 }, { unique: true });
}

export default mongoose.model('engine', engine, 'engine');