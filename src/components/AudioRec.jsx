import { Button } from '@mui/material';
import { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Pause } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';

export function AudioRec({ addNewRecord }) {
  const [isRecording, setIsRecording] = useState(false);

  const onStop = (url) => {
    addNewRecord(url);
  };

  const { startRecording, stopRecording } = useReactMediaRecorder({
    video: false,
    audio: true,
    onStop,
  });

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(false);
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

  return (
    <div className="channel">
      <div className={`audio-preview ${isRecording ? 'prevRecOn' : 'prevRec'}`}>
        <p>Record your self!(Only if you're a good singer)</p>

        <Button value="record" onClick={toggleRecording}>
          {isRecording ? <Pause /> : <MicIcon />}
        </Button>
      </div>
    </div>
  );
}
