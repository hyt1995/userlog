const get_search_text = (data) => {

    const { name, notation, version, owner } = data;

    return `${name} ${notation} ${version} ${owner}`;
}


const create_engine_format = ( args : any) =>{
    const obj = {
        name: args.name, // gbu만 쓰는데 등록은 둘다해야함, prod, stg번호
        notation: args.notation, // 여긴 설명이라 엔진을 설명할 수 있는 기존의 형식을 맞춰서 이름, 한국어 , 영어 등 gbu가 의도분류 붙고 gbi는 안붙는다. AI  경비원 의도 분류 엔진 이름
        image_path: "", // 안씀
        large_category: "thought",  // 안건든다
        middle_category: "chatbot", // 안건든다
        small_category: args.small_category,  // 분류 1 
        owner: args.owner ,  // 우리인지 타사인지 왠만하면 우리 엔진이다. maumaAI
        version: args.version,  // 그대로 씀
        kind: args.kind ? args.kind : "api",  // 엔진의 성격 같은거 외부api호출시 api, generate 생성용엔진
        base_url: args.base_url,  // api 호출 주소
        end_point: args.end_point, // api 호출 주소  gbu가 utter gbi가 intent
        method: "POST", // 
        auth: [], // 이건 인증이 필요할때만 근데 안씀
        description: args.description, // 설명 진짜 엔진 설명
        input_type: ["string"],  // 이건 지정
        output_type: ["object"], // 이건 지정 챗봇이어서 지정
        support: { // 엔진스펙정의 보통 파일으
          input_file: [],  // 파일을 받을때
          output_file: [],   // 파일을 내보낼때
          language: args.language ? args.language : [1],  // 엔진 언어
          sample_rate: []  // 음성 관련 엔진에서 사용 stt tts
        },
        parameter: {   //  엔진의 input을 넣는다. params input
          body: {
            host: args.host,  //  prod stg 엑셀 파일 번호 보면서 바꾸면 된다.
            session: "test",  //  지정
            data: args.data,  // 나중에 입력을 하는데 엑셀파일의 테스크 "처음으로" 비워두고 나중에 엔진을 호출할때 입력한다  // gbu가 utter gbi가 intent
            lang: args.lang ? args.lang : [1]  // 챗볼빌더 한글인지 영어chatbot 그 언어에 맞게 지금은 지정1 이지만 나중에 오류가 해결되면 바꾼다 지금은 1 지정
          }, 
          params: null,  // 지금 null로 지정이다
          query: null
        },
        search : get_search_text(args),
        open_to: [],  //  엔진의 특정 사용자에게 오픈 사용자 계정을 array로 넣는다. 빈값이면 모든 사용자 
        is_active: args.is_active ? args.is_active : false,  //  사이트에 노출시킬지 않시킬지  프론트가 작업 들어가면 스테이징에 오픈 작업할때 오픈 디폴트로 위에 두개 넣고 나중에 수정
        return: { // 엔진의 결과 챗봇마다 다 다름 여기서붕터는 건드릴일이 없다 챗봇이어서 안건드림 
            answer: {
                answer: "string"
            },
            expectedIntents: [
                {
                    intent: "string",
                    hierarchy: "number",
                    entityFlag: "boolean",
                    displayName: "string",
                    displayType: "string",
                    h_task: "string",
                    h_item: "string",
                    h_param: "string"
                }
            ],
            setMemory: {
                utter: {
                    utter: "string"
                },
                intent: {
                    intent: "string",
                    hierarchy: "number",
                    entityFlag: "boolean"
                },
                entities: "object",
                lifespan: "number",
                host: "string",
                session: "string"
            },
            display: "string",
            jsonDebug: "string",
            responseOrder: "string",
            h_task: "string",
            h_item: "string",
            h_param: "string"
      }
    }

    return obj
}

export {
    create_engine_format
}