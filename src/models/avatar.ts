'use strict';

import mongoose from "mongoose"
import { PROD_ENV } from "../lib/constants";

const Schema = mongoose.Schema

interface KeyRestrictionsType {
    [key : string] : any
  }


const avatar = new Schema<KeyRestrictionsType>({

  name: { type: String, required: true, trim: true }, // avatar 고유 name
  notation: { // avatar 표기(한글, 영문)
    type: {
      'ko_KR': { type: String, required: true },
      'en_US': { type: String, required: true }
    },
    _id: false,
    required: true
  },
  image: { // avatar 이미지 정보 존재 시 cloudfront url - admin 페이지에서 썸네일로 사용
    type: {
      'full': { type: String, required: false }, // 전신
      'middle': { type: String, required: false }, // 중간 크기 이미지
      'small': { type: String, required: false }, // 작은 이미지
      'face': { type: String, required: false } // 얼굴 이미지
    },
    _id: false,
    required: true
  },
  supported_language: { type: Array, required: true }, // [int, int] // 발화 가능 언어(1: 한국어, 2: 영어, 3: 일본어, 4: 중국어)
  clothes: {
    type: [{
      type: {
        'name': { type: String, required: true }, // 의상 명
        'image': { type: String, required: false }, // 의상 이미지 cloudfront url
        'color': { type: String, required: true }, // 의상 색상
      },
    }],
    _id: false,
    required: false
  },
  emotion: { type: Array, required: false, default: [] }, // [string, string] // 지원 감정(현재 0-default만 지원)
  pose: { type: Array, required: false, default: [] }, // [string, string] // 지원 포즈 - 현재 따로 사용하지 않음
  body: { type: Array, required: false, default: [] }, // [string, string] // 지원 사이즈(full, half, etc) - 현재 따로 사용하지 않음
  position: { type: Array, required: false, default: [] }, // [string, string] // 지원 위치(center, left, right) - 현재 따로 사용하지 않음
  resolution: { type: Array, required: true, default: [] }, // [int, int]  // 지원 해상도
  direction: { type: Array, required: true, default: [] }, // [string, string] // 지원 방향(vertical: 세로로 긴 화면, horizontal: 가로로 긴 화면)
  sample_rate: { type: Array, required: true, default: [] }, // [int, int] // 지원 샘플레이트
  // action: { type: Array, required: true, default: [] }, // [string, string]
  action: { // 지원 액션 값
    type: [{
      type: {
        'name': { type: String, required: true },
        'image_url': { type: String, required: false }
      },
    }],
    _id: false,
    required: true
  },
  is_default: { type: Boolean, required: true, default: false }, // 기본 아바타 여부(MD-OR에서 사용)
  is_active: { type: Boolean, required: true, default: true }, // 사용 가능 여부

  tts_speaker_name: { type: String, required: true, trim: true, default: 'hj_lim' },
  stf_speaker_name: { type: String, required: true, trim: true, default: 'hj_lim' },

  style_sheet: { type: Object, required: false, default: {} }, // MD-AD-FE에서 사용하는 값
  function: { type: Object, required: false, default: {} }, // MD-AD-FE에서 사용하는 값

  tts: { type: Object, required: false, default: {} },
  stf: { type: Object, required: false, default: {} },

  search: { type: String, required: true, trim: true, default: '' }, // MD-AD admin 페이지에서 아바타 검색 시 사용

},

  {
    timestamps: {},
    autoIndex: PROD_ENV.indexOf(process.env.NODE_ENV) === -1 ? true : false,
    versionKey: false,
    minimize: false, // style_sheet, function -> empty object로 들어오는 경우 위함
  });


if (PROD_ENV.indexOf(process.env.NODE_ENV) === -1) {
  avatar.index({ name: 1 }, { unique: true });
}

export default mongoose.model('avatar', avatar, 'avatar');