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
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto rounded-3xl bg-white/5 border border-white/15 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-4">
        {/* Top bar: Author Info & HD Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">
                  @{author?.username || 'reels_user'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              </div>
              <span className="text-[11px] text-gray-400 font-mono">
                Sosyal Medya Videosu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
            <Film className="w-3.5 h-3.5" />
            <span>1080p HD</span>
          </div>
        </div>

        {/* Video / Thumbnail Player Box */}
        <div className="relative rounded-2xl overflow-hidden bg-black/90 aspect-[9/14] sm:aspect-[9/12] max-h-[460px] flex items-center justify-center group shadow-inner">
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
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-400 gap-2">
                  <Play className="w-10 h-10 text-pink-500 opacity-60" />
                  <span className="text-xs font-medium">Önizleme Oynatıcı</span>
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Play Center Button */}
              <button
                onClick={togglePlay}
                className="absolute z-10 w-16 h-16 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white flex items-center justify-center shadow-2xl shadow-pink-600/50 group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Videoyu Oynat"
              >
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </button>
            </>
          )}

          {/* Quick Sound Toggle Button */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Caption and Title */}
        {caption && (
          <div className="px-1">
            <p className={`text-xs sm:text-sm text-gray-300 leading-relaxed ${showFullCaption ? '' : 'line-clamp-2'}`}>
              {caption}
            </p>
            {caption.length > 90 && (
              <button
                onClick={() => setShowFullCaption((prev) => !prev)}
                className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
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
