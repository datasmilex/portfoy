import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, User, Film, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import DownloadButton from './DownloadButton';

export default function VideoPreview({ media }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!media) return null;

  const {
    title,
    caption,
    thumbnailUrl,
    videoUrl,
    author,
  } = media;

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-xl"
    >
      <div className="flex flex-col gap-4">
        {/* Top bar: Author Info & HD Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-white">
                  @{author?.username || 'reels_user'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                Sosyal Medya Videosu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium">
            <Film className="w-3.5 h-3.5" />
            <span>1080p HD</span>
          </div>
        </div>

        {/* Video / Thumbnail Player Box */}
        <div className="relative rounded-xl overflow-hidden bg-zinc-950 aspect-[9/14] sm:aspect-[9/12] max-h-[460px] flex items-center justify-center group border border-zinc-800/60">
          {isPlaying ? (
            <video
              src={videoUrl}
              autoPlay
              controls
              playsInline
              muted={isMuted}
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <>
              {thumbnailUrl && !imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnailUrl}
                  alt={title || 'Reels Thumbnail'}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 gap-2">
                  <Play className="w-8 h-8 opacity-60" />
                  <span className="text-xs font-medium">Önizleme Oynatıcı</span>
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Play Center Button */}
              <button
                onClick={togglePlay}
                className="absolute z-10 w-14 h-14 rounded-full bg-white/95 hover:bg-white text-zinc-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                title="Videoyu Oynat"
              >
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </button>
            </>
          )}

          {/* Quick Sound Toggle Button */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Caption and Title */}
        {caption && (
          <div className="px-1">
            <p className={`text-xs sm:text-sm text-zinc-300 leading-relaxed ${showFullCaption ? '' : 'line-clamp-2'}`}>
              {caption}
            </p>
            {caption.length > 90 && (
              <button
                onClick={() => setShowFullCaption((prev) => !prev)}
                className="mt-1 flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {showFullCaption ? (
                  <>
                    <span>Daha Az Göster</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Devamını Oku</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Cross-Platform Download CTA */}
        <div className="pt-2">
          <DownloadButton media={media} />
        </div>
      </div>
    </motion.div>
  );
}
