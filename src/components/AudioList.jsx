import { useState, useRef } from 'react';
import { AudioPreview } from './AudioPreview';
import { AudioRec } from './AudioRec';
import { Ruler } from './Ruler';

export function AudioList({
  audios,
  onSelectAudio,
  removeAudio,
  isSinglePlaying,
  isAllPlaying,
  moveCursor,
  stopCursor,
  currTrackTime,
  setMuted,
  isPlaying,
  cursorPos,
  setCursorPos,
  setTrackTime,
  addNewRecord,
}) {
  const [isDrag, setIsDrag] = useState(false);
  const ref = useRef(null);
  const onMouseDown = () => {
    setIsDrag(true);
    console.log('Mousedown');
    // ref.current.style.transtion = 0;
  };
  const onMouseUp = () => {
    setIsDrag(false);
    console.log('Mouseup');
    ref.current.style.transitionDuration = '0.3s';
  };
  const onMove = (ev) => {
    ev.stopPropagation();
    if (isDrag) {
      // console.log('ev', ev.nativeEvent.offsetX);
      console.log('NODE: ,', ref);

      if (ev.nativeEvent.offsetX > 2) {
        var totalWidth = window.innerWidth - 40; //
        var lengthPercent = totalWidth / 100;
        let pos = ev.nativeEvent.offsetX / lengthPercent;
        if (Math.abs(cursorPos - pos) > 8) return;
        setCursorPos(pos);
        // 17
        setTrackTime(pos * (17 / 100));
      }
      return;
    }
  };
  const cancelDrag = () => {
    if (isDrag) setIsDrag(false);
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
          currTrackTime={currTrackTime}
          setMuted={setMuted}
          stopCursor={stopCursor}
          moveCursor={moveCursor}
          isSinglePlaying={isSinglePlaying}
          isAllPlaying={isAllPlaying}
          removeAudio={removeAudio}
          onSelectAudio={onSelectAudio}
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
