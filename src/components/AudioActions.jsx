import PlayCircle from '@mui/icons-material/PlayCircle';
import Stop from '@mui/icons-material/Stop';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pause from '@mui/icons-material/Pause';
import { Loop } from '@mui/icons-material';

export function AudioActions({
  togglePlay,
  stopPlaying,
  setIsLooping,
  isLooping,
  isPlaying,
}) {
  const toggleBtn = () => {
    togglePlay();
  };

  return (
    <div className="audio-actions">
      <ToggleButtonGroup aria-label="device">
        <ToggleButton
          style={{
            backgroundColor: isPlaying
              ? 'rgb(255 255 255 / 0.3)'
              : 'rgb(255 255 255 / 0)',
          }}
          onClick={toggleBtn}
          value="play"
          aria-label="play"
        >
          {isPlaying ? <Pause /> : <PlayCircle />}
        </ToggleButton>
        <ToggleButton onClick={stopPlaying} value="stop" aria-label="tv">
          <Stop />
        </ToggleButton>
        <ToggleButton
          style={{
            backgroundColor: isLooping
              ? 'rgb(255 255 255 / 0.3)'
              : 'rgb(255 255 255 / 0)',
          }}
          onClick={setIsLooping}
          value="loop"
          aria-label="loop"
        >
          <Loop />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
