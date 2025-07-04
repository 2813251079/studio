'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set a very low volume
      audio.volume = 0.05;

      // Try to play the audio
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented.
          // We'll wait for a user interaction to start the music.
          console.log("Autoplay was prevented. Waiting for user interaction.");
          const playOnClick = () => {
            audio.play().catch(e => console.error("Could not play audio on interaction:", e));
            window.removeEventListener('click', playOnClick);
            window.removeEventListener('keydown', playOnClick);
          };
          window.addEventListener('click', playOnClick);
          window.addEventListener('keydown', playOnClick);
        });
      }
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/audio/background-music.mp3" type="audio/mpeg" />
      Tu navegador no soporta el elemento de audio.
    </audio>
  );
}
