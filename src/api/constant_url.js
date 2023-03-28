export const GetHeader = (method = 'GET', multipart = false) => {
    return multipart ? {
        method: method,
        accept: 'application/json',
    } : {
        method: method,
        accept: 'application/json',
        headers: { 'Content-Type': 'application/json' },
    }
}

export const BASEURL = 'https://chatapi-ucjq.onrender.com/'

export const OpenAi = {
    getTranscriptUrl: BASEURL + 'OpenAi/getTranscript',
    getResponseUrl: BASEURL + 'OpenAi/getResponse',
}
