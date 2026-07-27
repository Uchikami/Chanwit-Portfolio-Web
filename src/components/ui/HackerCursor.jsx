import React, { useEffect, useState } from 'react';
import './HackerCursor.css';

const HackerCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add a class to body to hide default cursor
    document.body.classList.add('hide-default-cursor');

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      // Check if hovering over clickable element
      const clickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');
        
      setIsHovering(clickable);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.classList.remove('hide-default-cursor');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        className={`hacker-cursor-ring ${clicked ? 'clicked' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className="hacker-cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default HackerCursor;
