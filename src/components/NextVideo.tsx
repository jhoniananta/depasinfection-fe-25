import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface NextVideoProps {
  src: string; // can be .mp4 direct link, YouTube link, or GDrive link
  className?: string;
}

export default function NextVideo({ src, className }: NextVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Video ref only used for actual MP4 playback
  const videoRef = useRef<HTMLVideoElement>(null);

  // Quick check: is this an actual .mp4 link?
  const isMp4 = isMp4Link(src);

  // The onClick for our overlay
  const handlePlayPause = () => {
    if (isMp4) {
      // Handle .mp4 playback
      if (!videoRef.current) return;
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          // Chrome may throw AbortError if user quickly toggles
          if (error.name !== "AbortError") {
            console.error("Error playing video:", error);
          }
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      // Handle embedded iframe (YouTube / GDrive)
      // Toggling isPlaying just mounts/unmounts the iframe
      // so user effectively "stops" or "starts" the video
      setIsPlaying(!isPlaying);
    }
  };

  // For <video> events
  const handlePause = () => setIsPlaying(false);
  const handlePlay = () => setIsPlaying(true);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-lg z-50 ${className}`}
    >
      {/* Overlay with big play/pause icon */}
      <div
        className={`absolute inset-0 z-10 flex cursor-pointer items-center justify-center
          bg-neutral-900 bg-opacity-50 transition-opacity duration-500
          ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <FaPause className="text-6xl text-neutral-50 transition-transform duration-500 group-hover:scale-110 dark:text-neutral-900" />
        ) : (
          <FaPlay className="text-6xl text-neutral-50 transition-transform duration-500 group-hover:scale-110 dark:text-neutral-900" />
        )}
      </div>

      {isMp4 ? (
        // Native HTML5 video
        <video
          ref={videoRef}
          className="h-full w-full"
          controls
          loop
          autoPlay
          disablePictureInPicture
          onPause={handlePause}
          onPlay={handlePlay}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback to iframe (YouTube, GDrive, etc.)
        // We only load the iframe if isPlaying=true
        <iframe
          title="video"
          className="h-full w-full"
          src={isPlaying ? transformEmbedUrl(src) : ""}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

// -------------- HELPER UTILS ---------------

function isMp4Link(url: string) {
  // Basic check if it ends with .mp4
  return url.toLowerCase().endsWith(".mp4");
}

function transformEmbedUrl(url: string) {
  // Return an embeddable URL (e.g. for YouTube or GDrive)
  try {
    // For YouTube
    if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
      let videoId = "";
      // If shortlink: youtu.be/<id>
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split(/[?&]/)[0] ?? "";
      } else {
        // If normal watch link
        const vMatch = url.match(/[?&]v=([^?&]+)/);
        if (vMatch && vMatch[1]) videoId = vMatch[1];
      }
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // For Google Drive
    if (url.includes("drive.google.com/file/d/")) {
      const match = url.match(/\/file\/d\/([^/]+)/);
      const fileId = match ? match[1] : "";
      return `https://drive.google.com/file/d/${fileId}/preview?autoplay=1`;
    }
  } catch (err) {
    console.error("Error transforming embed URL:", err);
  }

  // If none matched, just return the original
  return url;
}
