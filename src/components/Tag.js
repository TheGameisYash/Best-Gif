// Tag.js
import React, { useState } from 'react';
import Spinner from './Spinner';
import useGif from '../hooks/useGif';
import './styles.css'; // Ensure this import is correct and the path is accurate

const Tag = () => {
  const { gif, loading, fetchData } = useGif();
  const [cursorPosition, setCursorPosition] = useState({ x: '50%', y: '50%' });
  const [hoveringUpper, setHoveringUpper] = useState(false);
  const [hoveringLower, setHoveringLower] = useState(false);
  const [hoveringLeft, setHoveringLeft] = useState(false);
  const [hoveringRight, setHoveringRight] = useState(false);
  const [tag, setTag] = useState('');

  const handleHover = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Determine which borders to highlight
    setHoveringUpper(y < 0.1);
    setHoveringLower(y > 0.9);
    setHoveringLeft(x < 0.1);
    setHoveringRight(x > 0.9);

    setCursorPosition({ x: x * 100 + '%', y: y * 100 + '%' });
  };

  // Function to handle click and initiate animation
  const handleGenerateClick = () => {
    document.body.classList.add("animate"); // Apply animation to body
    setTimeout(() => {
      document.body.classList.remove("animate"); // Remove animation class after 1 second
    }, 1000);
    fetchData(tag); // Fetch new gif based on the tag
  };

  return (
    <div
      className={`card-tag w-1/2 bg-black rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] hover-effect ${hoveringUpper ? 'upper-hover' : ''} ${hoveringLower ? 'lower-hover' : ''} ${hoveringLeft ? 'left-hover' : ''} ${hoveringRight ? 'right-hover' : ''}`}
      onMouseMove={handleHover}
      onMouseLeave={() => {
        setHoveringUpper(false);
        setHoveringLower(false);
        setHoveringLeft(false);
        setHoveringRight(false);
      }}
    >
      <h1 className='text-2xl mt-[15px] underline text-white .playwrite-us-modern playwrite-es'>Random {tag} Gif</h1>
      
      {loading ? (<Spinner/>) : (<img src={gif} alt='Random Gif' width="450"/>)}
      <div className="cursor-tag-effect" style={{ '--x': cursorPosition.x, '--y': cursorPosition.y }}></div>

      <input
        className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center relative'
        onChange={(event) => setTag(event.target.value)}
        value={tag}
      />
      
      <button
        id="generateButton" // Added id for animation reference
        onClick={handleGenerateClick}
        className='w-10/12 bg-custom-color text-lg py-2 rounded-lg mb-[20px] relative  '
      >
        Generate
      </button>
      
    </div>
  );
};

export default Tag;
//testing verified commits