'use strict';

import mongoose from "mongoose"
import { PROD_ENV } from "../lib/constants";

const Schema = mongoose.Schema

interface KeyRestrictionsType {
    [key : string] : any
  }


const aihuman = new Schema<KeyRestrictionsType>({

    name: { type: String, required: true, trim: true }, // aihuman 고유 name
    notation: { // aihuman 표기(한글, 영문)
        type: {
            'ko_KR': { type: String, required: true },
            'en_US': { type: String, required: true }
        },
        _id: false,
        required: true
    },
    image: { // aihuman 이미지 정보 존재 시 cloudfront url
        type: {
            'full': { type: String, required: false }, // 전신
            'middle': { type: String, required: false }, // 중간 크기 이미지
            'small': { type: String, required: false }, // 작은 이미지
            'face': { type: String, required: false } // 얼굴 이미지
        },
        _id: false,
        required: true
    },
    language: { type: Array, required: true }, // [int, int] // 발화 가능 언어(1: 한국어, 2: 영어, 3: 일본어, 4: 중국어)
    clothes: { // 지원 의상 목록
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
    resolution: { // 지원 해상도
        type: [{
            type: {
                'width': { type: Number, required: false, defualt: 0 },
                'height': { type: Number, required: false, defualt: 0 },
            },
        }],
        _id: false,
        required: false
    },
    sample_rate: { type: Array, required: true, default: [] }, // [int, int] // 지원 샘플레이트
    action: { // 지원 액션 값
        type: [{
            type: {
                'name': { type: String, required: true },
                'image': { type: String, required: false },
                'face_position': {
                    type: {
                        'x': { type: Number, required: false, defualt: 0 },
                        'y': { type: Number, required: false, defualt: 0 },
                    },
                    _id: false,
                    required: false
                },
            },
            _id: false,
            required: true
        }],
        _id: false,
        required: true
    },
    is_active: { type: Boolean, required: true, default: true }, // 사용 가능 여부

    tts_speaker_name: { type: String, required: true, trim: true, default: 'hj_lim' },
    stf_speaker_name: { type: String, required: true, trim: true, default: 'hj_lim' },

    style_sheet: { type: Object, required: false, default: {} }, // MD-AD-FE에서 사용하는 값
    function: { type: Object, required: false, default: {} }, // MD-AD-FE에서 사용하는 값

},

    {
        timestamps: {},
        autoIndex: PROD_ENV.indexOf(process.env.NODE_ENV) === -1 ? true : false,
        versionKey: false,
        minimize: false, // style_sheet, function -> empty object로 들어오는 경우 위함
    });


if (PROD_ENV.indexOf(process.env.NODE_ENV) === -1) {
    aihuman.index({ name: 1 }, { unique: true });
}

export default mongoose.model('aihuman', aihuman, 'aihuman');