import { useState, useRef } from 'react';
import { AudioPreview } from './AudioPreview';
import { AudioRec } from './AudioRec';
import { Ruler } from './Ruler';

export function AudioList({
  audios,
  setMuted,
  isPlaying,
  cursorPos,
  setCursorPos,
  setTrackTime,
  addNewRecord,
}) {
  const [isDrag, setIsDrag] = useState(false);
  const ref = useRef(null);

  //Handling drag events
  const onMouseDown = () => {
    setIsDrag(true);
  };

  const onMouseUp = () => {
    setIsDrag(false);
    ref.current.style.transitionDuration = '0.3s';
  };

  //Calculating the cursor position so the player will know from which spot to play
  const onMove = (ev) => {
    ev.stopPropagation();
    if (isDrag) {
      if (ev.nativeEvent.offsetX > 2) {
        var totalWidth = window.innerWidth - 40; //
        var lengthPercent = totalWidth / 100;
        let pos = ev.nativeEvent.offsetX / lengthPercent;
        if (Math.abs(cursorPos - pos) > 8) return;
        setCursorPos(pos);
        setTrackTime(pos * (17 / 100));
      }
      return;
    }
  };

  return (
    <section onMouseMove={onMove} onMouseUp={onMouseUp} className="audio-list">
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{ left: cursorPos + '%' }}
        className="line-through"
        ref={ref}
      ></div>
      <Ruler />

      {audios.map((audio, idx) => (
        <AudioPreview
          setMuted={setMuted}
          audio={audio}
          key={audio._id}
          isPlaying={isPlaying}
          idx={idx}
        />
      ))}
      <AudioRec addNewRecord={addNewRecord}></AudioRec>
    </section>
  );
}
