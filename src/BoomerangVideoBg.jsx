import React, { useEffect, useRef, useState } from 'react';

export default function BoomerangVideoBg({ src }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let capturedFrames = [];
    let isCapturing = true;

    const captureFrame = () => {
      if (!isCapturing || !video) return;

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        // Calculate scaled dimensions (max width 960px)
        const scale = Math.min(1, 960 / video.videoWidth);
        const w = video.videoWidth * scale;
        const h = video.videoHeight * scale;

        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = w;
        frameCanvas.height = h;
        const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });
        frameCtx.drawImage(video, 0, 0, w, h);
        
        capturedFrames.push(frameCanvas);
      }

      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(captureFrame);
      } else {
        requestAnimationFrame(captureFrame);
      }
    };

    const handlePlay = () => {
      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(captureFrame);
      } else {
        requestAnimationFrame(captureFrame);
      }
    };

    const handleEnded = () => {
      isCapturing = false;
      setFrames(capturedFrames);
      setIsVideoEnded(true);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    // Start playing
    video.play().catch(e => console.error("Video autoplay blocked:", e));

    return () => {
      isCapturing = false;
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  // Ping-pong render loop
  useEffect(() => {
    if (!isVideoEnded || frames.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set actual canvas size to match the captured frames
    const firstFrame = frames[0];
    canvas.width = firstFrame.width;
    canvas.height = firstFrame.height;

    let currentFrame = 0;
    let direction = 1;
    let animationFrameId;
    let lastTime = performance.now();
    const fps = 30;
    const interval = 1000 / fps;

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);
      
      const deltaTime = time - lastTime;
      if (deltaTime > interval) {
        lastTime = time - (deltaTime % interval);
        
        ctx.drawImage(frames[currentFrame], 0, 0);
        
        currentFrame += direction;
        
        if (currentFrame >= frames.length - 1) {
          currentFrame = frames.length - 1;
          direction = -1;
        } else if (currentFrame <= 0) {
          currentFrame = 0;
          direction = 1;
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVideoEnded, frames]);

  return (
    <div className="absolute inset-0 z-0 scale-[1.08] origin-center overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        src={src}
        crossOrigin="anonymous"
        muted
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoEnded ? 'opacity-0' : 'opacity-100'}`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoEnded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
