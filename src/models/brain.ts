'use strict';

import mongoose from "mongoose"
import { PROD_ENV } from "../lib/constants";

const Schema = mongoose.Schema

interface KeyRestrictionsType {
    [key : string] : any
  }

const brain = new Schema<KeyRestrictionsType>(
    {
        owner: { type: String, required: true }, // 워크플로우 소유자
        name: { type: String, required: true }, // 워크플로우 명
        render_info: { type: Schema.Types.Mixed, default: {} }, // MD-AD-FE에서 사용하는 값
    
        neurons: { // 워크플로우 구성
          type: [
            [
              {
                type: Object,
                required: true,
                default: {},
              },
            ],
          ],
          validate: [(n : any) => n.length <= 50, "{PATH} exceeds the limit of 30"],
        },
    
        ui_component: { // MD-OR에서 사용(현재 사용하지 않음)
          type: Array,
          required: false,
          default: [],
          validate: [(n : any) => n.length <= 100, "{PATH} exceeds the limit of 100"],
        },
    
        subscription_id: { type: String, required: true, default: "bonus" }, // MD-OR에서 사용(현재 사용하지 않음)
        app_id: { type: String, required: true, default: "bonus_app_id" }, // 워크플로우 고유 id(uuid(소유자 명 + 워크플로우 명)으로 이루어짐)
        limit_user: { type: Number, required: true, default: 5 },  // MD-OR에서 사용(동접 제한 용, 현재 사용하지 않음)
    
        usage: { // 워크플로우 사용량, 과금 체계에 따라 default 값이 산정되어 적용되어야 함
    
          run_count: { type: Number, required: false, default: 0 },
          ok_count: { type: Number, required: false, default: 0 },
          fail_count: { type: Number, required: false, default: 0 },
          rest_exec_count: { type: Number, required: false, default: 1000000000 },
    
          received_data: { type: Number, required: false, default: 0 },
          rest_received_data: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
          fail_received_data: { type: Number, required: false, default: 0 },
    
          transmit_data: { type: Number, required: false, default: 0 },
          rest_transmit_data: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
          fail_transmit_data: { type: Number, required: false, default: 0 },
    
          duration: { type: Number, required: false, default: 0 },
          fail_duration: { type: Number, required: false, default: 0 },
    
          vsp: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 1000000000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          stt: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 10000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          tts: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 10000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          stf: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 1000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          chatbot: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 1000000000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          api: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 1000000000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          vision: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 1000000000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          },
    
          lm: {
    
            time_duration: { type: Number, required: false, default: 0 },
            rest_time_duration: { type: Number, required: false, default: 1000 * 60 * 60 * 24 * 30 * 3 },
            data_size: { type: Number, required: false, default: 0 },
            rest_data_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 50 },
            text_count: { type: Number, required: false, default: 0 },
            rest_text_count: { type: Number, required: false, default: 20000 },
            exec_count: { type: Number, required: false, default: 0 },
            rest_exec_count: { type: Number, required: false, default: 1000000000 },
            attach_size: { type: Number, required: false, default: 0 },
            rest_attach_size: { type: Number, required: false, default: 1024 * 1024 * 1024 * 10 },
            attach: { type: Number, required: false, default: 0 },
            rest_attach: { type: Number, required: false, default: 100000000 },
            audio: { type: Number, required: false, default: 0 },
            rest_audio: { type: Number, required: false, default: 0 },
            audio_size: { type: Number, required: false, default: 0 },
            rest_audio_size: { type: Number, required: false, default: 0 },
            video: { type: Number, required: false, default: 0 },
            rest_video: { type: Number, required: false, default: 0 },
            video_size: { type: Number, required: false, default: 0 },
            rest_video_size: { type: Number, required: false, default: 0 },
            image: { type: Number, required: false, default: 0 },
            rest_image: { type: Number, required: false, default: 0 },
            image_size: { type: Number, required: false, default: 0 },
            rest_image_size: { type: Number, required: false, default: 0 },
            stream: { type: Number, required: false, default: 0 },
            rest_stream: { type: Number, required: false, default: 0 },
            stream_size: { type: Number, required: false, default: 0 },
            rest_stream_size: { type: Number, required: false, default: 0 }
          }
    
    
        },
    
        be_tested: { type: Number, required: false, default: 0 }, // 0: 테스트안됨, 1: 테스트 성공, 2: 테스트 실패
        status: { type: Number, required: true }, // 0: 중간저장/준비중, 1: ON, 2: INVALID
    
        default_human: {  // MD-OR에서 사용(default human 세팅 시 사용)
          // type: {
          tts: {
            lang: { type: Number, required: true, default: 1 },
            sampleRate: { type: Number, required: true, default: 0 },
            text: { type: String, required: false, default: "" },
            speaker: { type: Number, required: true, default: 0 },
            profile: { type: String, required: false, default: "" },
            audioEncoding: { type: Number, required: true, default: 0 },
            speakerName: { type: String, required: true, default: "hj_lim" },
            emotion: { type: Number, required: true, default: 0 },
            durationRate: { type: Number, required: false, default: 1.0 },
            padding: {
              begin: { type: Number, required: true, default: 0.1 },
              end: { type: Number, required: true, default: 0.1 },
            },
          },
    
          stf: {
            audio: { type: String, required: false, default: null },
            background: { type: String, required: false, default: null },
            speaker_id: { type: Number, required: true, default: 0 },
            speakerName: { type: String, required: false, default: "hj_lim" },
            resolution: {
              width: { type: Number, required: true, default: 1920 },
              height: { type: Number, required: true, default: 1080 },
            },
            transparent: { type: Boolean, required: false, default: true },
            action: { type: String, required: false, default: "default" },
            isVideoBackground: { type: Boolean, required: false, default: false },
            videoFormat: { type: Number, required: false, default: 1 },
          },
    
          dom: { type: String, required: false, default: "default" },
        },
        // },
    
        category: { type: Number, required: false, default: 0 },
        srv_category: { type: String, required: false, default: "ai_human" }, // "ai_human", "cloud_api"
        // receive_data: { type: Number, required: false, default: 0 },
        // transmit_data: { type: Number, required: false, default: 0 },
        // speak_data: { type: Number, required: false, default: 0 },
        // speak_count: { type: Number, required: false, default: 0 },
        // speak_fail_count: { type: Number, required: false, default: 0 },
    
        start_time: {  // 워크플로우 사용 시작일(현재는 createdAt 값과 동일하게 데이터 저장됨)
          type: Date,
          required: true,
          default: () => Date.now(),
        },
    
        expiry_time: {  // MD-OR에서 사용(워크플로우 사용 만료 시각, 현재 사용하지 않음)
          type: Date,
          required: true,
          default: () => Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
        },
    
        search: { type: String, required: true, trim: true, default: '' }, // 워크플로우 검색 시 사용하는 string
      },
    
      {
        timestamps: {},
        minimize: false,
        versionKey: false,
        autoIndex: PROD_ENV.indexOf(process.env.NODE_ENV) === -1 ? true : false,
      }
)


export default mongoose.model('brain', brain, "brain")