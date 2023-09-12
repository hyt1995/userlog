"use strict";

const INVALID_STRING = [null, undefined, "", "null"];
const DB_DUPLICATION_ERROR_MESSAGE = "duplicated_information";
const DB_DUPLICATION_ERROR_CODE = 11000;
const PASSWORD_BLACKLIST = [
  // 더 추가해야 함
  "Password123",
  "PasswOrd",
  "paSSword1234",
];
const DEFAULT_LOCALES = [
  "en-US",
  "ko-KR",
  "ja-JP",
  "zh-CN",
  "zh-TW",
  "es-ES",
  "fr-FR",
  "de-DE",
];

const DEFAULT_LOCALES_GQL = [
  "en-US",
  "ko-KR",
  "ja-JP",
  "zh-CN",
  "zh-TW",
  "es-ES",
  "fr-FR",
  "de-DE",
];


const GENRE_SORT_MAPPING_ITEM = [
  'c',
  'u',
  'cti',
  'lst'
];

const SEARCH_SORT_MAPPING_ITEM = [
  'en',
  'kr'
  // 'vd', //'video_duration',
  // 'lst', //'live_start_time',
  // 'vst' //'vod_start_time'
];

const SOCCER_BOARD_KEY_KR = [
  'sport', // 스포츠 종류
  'play_type', // 경기 형태 1: 매치형(팀전, 개인대결), 2: 개인기록형, 3, 단체기록형
  'present_round',
  "present_quarter",
  "detail_url",
  "api_url",
  "name",
  "nick_name",
  "score",
  "icon"
];

const SOCCER_BOARD_KEY_EN = [
  'sport', // 스포츠 종류
  'play_type', // 경기 형태 1: 매치형(팀전, 개인대결), 2: 개인기록형, 3, 단체기록형
  'present_round',
  "present_quarter",
  "detail_url",
  "api_url",
  "name",
  "nick_name",
  "score",
  "icon"
];

const TONGEU_KEY = [

  "en-US",
  "ko-KR",
  "zh-CN",
  "zh-TW",
  "ja-JP",
  "fr-FR",
  "de-DE",
  "es-ES"

];

const PLAY_TYPE = [
  'live',
  'vod'
];

const ORDER_TYPE = [
  'desc',
  'asce'
];

const LIVE_LIST_SORT_TYPE = [ 'start', 'expo' ];
const CATEGORY_KIND = ['genre', 'category', 'league', 'season', 'round'];

const LIVE_PAUSE_STATUS=108;
const LIVE_RESUME_STATUS=1;


// awsdevel: 한국 테스트(DB:tieuro계정 사용), 'awsprod': production 예비용, 'awskr': 한국 클라우드 총괄
const PROD_ENV = ['production', 'awsprod', 'awskr'];

const GET_SDS_UTTER_BODY = [ 'host', 'session', 'data', 'lang'];


export {
  
  INVALID_STRING,
  PASSWORD_BLACKLIST,
  DEFAULT_LOCALES,
  DEFAULT_LOCALES_GQL,
  DB_DUPLICATION_ERROR_MESSAGE,
  DB_DUPLICATION_ERROR_CODE,
  SOCCER_BOARD_KEY_EN,
  SOCCER_BOARD_KEY_KR,
  TONGEU_KEY,
  PLAY_TYPE,
  LIVE_LIST_SORT_TYPE,
  ORDER_TYPE,
  GENRE_SORT_MAPPING_ITEM,
  CATEGORY_KIND,
  SEARCH_SORT_MAPPING_ITEM,
  LIVE_PAUSE_STATUS,
  LIVE_RESUME_STATUS,
  PROD_ENV,
  GET_SDS_UTTER_BODY

};
