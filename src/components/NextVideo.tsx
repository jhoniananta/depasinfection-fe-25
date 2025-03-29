import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface NextVideoProps {
  src: string;
  className?: string;
}

export default function NextVideo({ src, className }: NextVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-lg z-50 ${className}`}
    >
      <div
        className={`absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-neutral-900 bg-opacity-50 transition-opacity duration-500 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <FaPause className="text-6xl text-neutral-50 transition-transform duration-500 group-hover:scale-110 dark:text-neutral-900" />
        ) : (
          <FaPlay className="text-6xl text-neutral-50 transition-transform duration-500 group-hover:scale-110 dark:text-neutral-900" />
        )}
      </div>
      <video
        ref={videoRef}
        className="h-full w-full"
        disablePictureInPicture
        autoPlay
        loop
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
