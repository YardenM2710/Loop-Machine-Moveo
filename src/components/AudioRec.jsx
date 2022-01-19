import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { VolumeMute, VolumeOff } from '@mui/icons-material';
import { useReactMediaRecorder } from 'react-media-recorder';
import ToggleButton from '@mui/material/ToggleButton';
import { Recording, Pause } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
export function AudioRec({ addNewRecord }) {
  const [isRecording, setIsRecording] = useState(false);
  const onStop = (url) => {
    console.log('hello', url);
    addNewRecord(url);
  };
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true, onStop });

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(false);
    } else {
      startRecording();
      setIsRecording(true);
    }
    console.log('Recordin!', isRecording);
  };

  return (
    <div
      // style={{ backgroundColor: audio.color }}
      className={`audio-preview ${isRecording ? 'prevRecOn' : 'prevRec'}`}
    >
      <p>Record your self!</p>

      <ToggleButton value="record" onClick={toggleRecording}>
        {isRecording ? <Pause /> : <MicIcon />}
      </ToggleButton>
    </div>
  );
}
