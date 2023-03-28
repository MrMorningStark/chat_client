import React from 'react';

const Mic = ({ startListening, value, micDisabled, setValue,isLoading,isRecording,loadTranscript }) => (
  <div className='mic'>
    <input value={value} placeholder='ask anything' onChange={(e) => setValue(e.target.value)} />
    <button onClick={() => {
      if (value === '' || isLoading || isRecording) {
        return;
      }
      let input = value;
      setValue('');
      loadTranscript(input);
    }}>submit</button>
    <div className='mic-circle' onClick={startListening} style={{ cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "center", height: "45px", width: "45px", border: "3px solid #ECF2FF", borderRadius: "50%" }} >
      <i style={{ color: "#EB455F" }} className={`fa-solid fa-microphone ${isRecording && 'fa-fade'} fa-lg`} />
    </div>
  </div>
);

export default Mic;
