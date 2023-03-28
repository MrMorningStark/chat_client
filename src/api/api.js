import { GetHeader, OpenAi } from "./constant_url";


export const getTranscript = async (audioData) => {

    try {
        var finalURL = OpenAi.getTranscriptUrl;

        var Finalinit = { ...GetHeader('POST', true), body: audioData };

        let res = await (await fetch(finalURL, Finalinit)).json();

        return res;
    }
    catch (error) {
        console.log(error.message);
    }

}

export const getResponse = async (data) => {

    try {
        var finalURL = OpenAi.getResponseUrl;

        var Finalinit = { ...GetHeader('POST'), body: JSON.stringify(data) };

        let res = await (await fetch(finalURL, Finalinit)).json();

        return res;
    }
    catch (error) {
        console.log(error.message);
    }

}
