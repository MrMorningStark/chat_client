import './inputBoxWithMicrophone.css';

const InputBoxWithMicrophone = ({ prompt, setPrompt, onMicrophoneClick, listening, getAiResponse, isLoading }) => {

    const onChange = (e) => {
        setPrompt(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
    }

    const onEnter = (e) => {
        if (e.key === 'Enter' && prompt.length !== 0 && !isLoading) {
            getAiResponse(prompt);
        }
    }

    return <>
        <input type={'text'} disabled={listening || isLoading} value={listening && prompt.length == 0 ? '' : prompt} className={"input-box"} placeholder={listening ? 'Listening...' : "Ask anything"} onChange={onChange} onKeyUp={onEnter} />
        <i className={`microphone fa-solid fa-microphone fa-lg ${listening && 'active'}`} onClick={onMicrophoneClick} />
    </>
}

export default InputBoxWithMicrophone;