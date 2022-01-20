import { useEffect, useState } from 'react';
import { audioService } from '../services/audioService';
import { AudioList } from '../components/AudioList';
import { AudioActions } from '../components/AudioActions';
import { useInterval } from 'react-interval-hook';
import { MainHeader } from '../components/MainHeader';
import { utilService } from '../services/utilService';

export function AudioPage() {
  const [audios, setAudios] = useState(null);
  const [currTrackTime, setTrackTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const [isLooping, setIsLoop] = useState(false);

  /// Interval hook to manage audio player status
  const { start, stop, isActive } = useInterval(
    () => {
      setIsPlaying(true);
      setTrackTime(currTrackTime + 0.1);
      setCursorPos((cursorPos) => cursorPos + 5.882352941176471 / 10);

      if (currTrackTime > 17.1) {
        setIsPlaying(false);
        setTrackTime(0);
        setCursorPos(0);
        stop();
        if (isLooping) {
          start();
        }
      }
    },
    100,
    { autoStart: false }
  );

  //Adding new audio to the list
  const addNewRecord = (src) => {
    let newAudios = [
      ...audios,
      {
        _id: utilService.makeId(),
        title: 'Your audio here',
        src: src,
      },
    ];

    setAudios(newAudios);
  };

  //----------------------------Audio Load section-----------------------------------------
  useEffect(() => {
    loadAudios();
  }, []);

  async function loadAudios() {
    try {
      const audios = await audioService.query();
      setAudios(audios);
    } catch (err) {
      console.log('Couldnt load audios', err);
    }
  }

  //--------------------------Audio Play section-------------------------------------------
  const togglePlay = () => {
    if (isActive()) {
      stop();
      setIsPlaying(false);
    } else {
      start();
      setIsPlaying(true);
    }
  };

  const onStopPlaying = () => {
    stop();
    setCursorPos(0);
    setTrackTime(0);
    setIsPlaying(false);
  };

  const setMuted = async (id) => {
    let newAudios = audios.map((audio) => {
      if (id === audio._id) {
        audio.isMuted = !audio.isMuted;
      }
      return audio;
    });
    setAudios(newAudios);
  };

  const setIsLooping = () => {
    setIsLoop((isLooping) => !isLooping);
  };

  if (!audios) return <div>Loading...</div>;
  return (
    <>
      <MainHeader />
      <div className="container fade-in1">
        <AudioList
          setMuted={setMuted}
          audios={audios}
          isPlaying={isPlaying}
          cursorPos={cursorPos}
          setCursorPos={setCursorPos}
          setTrackTime={setTrackTime}
          addNewRecord={addNewRecord}
        />
        <AudioActions
          setIsLooping={setIsLooping}
          stopPlaying={onStopPlaying}
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          isLooping={isLooping}
        />
      </div>
    </>
  );
}
