const get_tts_param = (args : any) => {

    const { speaker_name } = args;

    const obj = {
        lang: args.supported_language ? args.supported_language[0] : 1,
        sampleRate: 22050,
        text: '',
        speaker: 0,
        profile: '',
        audioEncoding: 0,
        speakerName: speaker_name,
        emotion: 0,
        durationRate: 1.0,
        padding: {
            begin: 0.1,
            end: 0.1
        }
    };

    return obj;
}

const get_stf_param = (args : any, data : any) => {

    const { split_resol, action, speaker_name, direction, excel_num } = args;
    let width = 3840;
    let height = 2160;
    if (direction.length > 0) {
        if (direction.indexOf('horizontal') > -1) {
            width = split_resol[0] * 16 / 9;
            height = split_resol[0];
        } else { // vertical
            width = split_resol[0];
            height = split_resol[0] * 16 / 9;
        }
    } else {
        width = split_resol[0] * 16 / 9;
        height = split_resol[0];
    }

    const obj = {
        audio: '',
        background: '',
        speaker_id: 0,
        speakerName: speaker_name,
        resolution: {
            // width: resolution[0] * 16 / 9, // 3840
            // height: resolution[0] // 2160
            width: width,
            height: height
        },
        transparent: true,
        action: data[`${excel_num[1]}`].v,
        isVideoBackground: false,
        videoFormat: 1
    };

    return obj;
}


const get_search_text = (name : string , args : any) => {

    return `${name} ${args.ko_KR} ${args.en_US}`;
}

const make_saving_data = (data : any, ex_num : string[], args : any) => {
    const tts = get_tts_param(args);
    const stf = get_stf_param(args, data);
    const is_default = data[`${ex_num[0]}`].v.indexOf('default_') > -1 ? true : false;

    const obj = {
        'name': data[`${ex_num[0]}`].v,
        'notation': {
            ko_KR: args.ko_KR,
            en_US: args.en_US
        },
        'image': {
            full : null,
            middle : null,
            small : null,
            face : null,
          },
        'supported_language': args.supported_language ? args.supported_language : [1],
        'clothes': [],
        'emotion': [],
        'pose': [],
        'body': [],
        'position': [],
        'resolution': args.split_resol,
        'direction': args.direction,
        'sample_rate': args.sample_rate ? args.sample_rate : 22050,
        'action': [
            {
                name: data[`${ex_num[1]}`].v,
                image_url: ""
            }
        ],
        'is_default': is_default,
        'is_active': args.is_active ? args.is_active : true,
        'tts_speaker_name': args.speaker_name,
        'stf_speaker_name': args.speaker_name,
        'style_sheet': args.style_sheet ? args.style_sheet : {},
        'function': args.function ? args.function : {},
        'tts': tts,
        'stf': stf,
        'search': get_search_text(data[`${ex_num[0]}`].v, args)
    };


    return obj;
}


export {
    get_tts_param,
    get_stf_param,
    get_search_text,
    make_saving_data,
}