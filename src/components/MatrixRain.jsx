import { useEffect, useRef } from 'react';
import './MatrixRain.css';

const MatrixRain = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateSize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    updateSize();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    let timeoutId;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade effect creates trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41'; // Hacker green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      timeoutId = setTimeout(() => requestAnimationFrame(draw), 33);
    };

    draw();

    window.addEventListener('resize', updateSize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateSize);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-canvas"
    />
  );
};

export default MatrixRain;
