import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { VolumeMute, VolumeOff } from '@mui/icons-material';

export function AudioPreview({ audio, setMuted, isPlaying, idx }) {
  const [currAudio, setAudio] = useState(false);

  ///Creating new audio

  useEffect(() => {
    setAudio(new Audio(audio.src));
  }, []);

  ///Toggle on mute audio
  const togglePlay = () => {
    setMuted(audio._id);
  };

  ///Checking which audio to play / mute
  useEffect(() => {
    if (!currAudio) return;
    if (audio.isMuted || !isPlaying) {
      currAudio.pause();
    } else {
      currAudio.play();
    }
  }, [isPlaying, audio.isMuted]);

  return (
    <div className="channel">
      <div className={`audio-preview prev${idx + 1}`}>
        <p>{audio.title}</p>
        <Button
          onClick={togglePlay}
          variant="primary"
          value="laptop"
          aria-label="laptop"
        >
          {!audio.isMuted ? <VolumeMute /> : <VolumeOff />}
        </Button>
      </div>
    </div>
  );
}
