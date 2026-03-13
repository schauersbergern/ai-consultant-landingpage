import { useState } from "react";
import { Play } from "lucide-react";

type LazyVideoEmbedProps = {
  embedUrl: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
};

export function LazyVideoEmbed({
  embedUrl,
  title,
  posterSrc,
  posterAlt,
}: LazyVideoEmbedProps) {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsActive(true)}
      className="group relative h-full w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      aria-label={`${title} Video abspielen`}
    >
      <img
        src={posterSrc}
        alt={posterAlt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/92 text-blue-700 shadow-lg transition-transform duration-300 group-hover:scale-105">
          <Play className="ml-1 h-7 w-7 fill-current" />
        </span>
      </div>
      <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium text-white">
        Video laden
      </span>
    </button>
  );
}
