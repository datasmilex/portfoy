import React from 'react';

/** Yunovax cube mark in the site's ivory tones. */
export default function Logo({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="8 8 48 50" className={className} aria-hidden="true">
      <path d="M31.4 9.2a1.3 1.3 0 0 1 1.2 0L52.8 21 32 33 11.2 21z" fill="var(--color-paper)" />
      <path d="M9.4 24 30.7 36.3V57L10 45a1.3 1.3 0 0 1-.6-1.1z" fill="var(--color-paper-dim)" />
      <path d="M54.6 24 33.3 36.3V57L54 45a1.3 1.3 0 0 0 .6-1.1z" fill="var(--color-mute)" />
    </svg>
  );
}
