import MediaControlCard from "components/Song/index";
import { Item } from "models";
import { useState } from "react";

interface ControlProps {
  play: boolean;
  track: Item | undefined;
  onPause(): void;
  onPlay(): void;
  audioRef: React.RefObject<HTMLAudioElement>;
  onNext: () => void;
  onBack: () => void;
}

export function Control({
  play,
  track,
  audioRef,
  onBack,
  onNext,
  onPause,
  onPlay,
}: ControlProps) {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="control">
      {track && (
        <MediaControlCard
          song={track}
          disabled={!track.preview_url}
          play={play}
          onClick={() => {
            if (!play) onPlay();
            else onPause();
          }}
          onNext={onNext}
          onBack={onBack}
          currentTime={currentTime}
          audioRef={audioRef}
        />
      )}
      <audio
        style={{
          display: "none",
        }}
        src={(track && track.preview_url) || ""}
        ref={audioRef}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
      />
    </div>
  );
}
