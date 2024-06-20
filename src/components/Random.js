import React, { useState } from 'react';
import Spinner from './Spinner';
import useGif from '../hooks/useGif';

const Random = () => {
  const { gif, loading, fetchData } = useGif();
  const [cursorPosition, setCursorPosition] = useState({ x: '50%', y: '50%' });
  const [hoveringUpper, setHoveringUpper] = useState(false);
  const [hoveringLower, setHoveringLower] = useState(false);
  const [hoveringLeft, setHoveringLeft] = useState(false);
  const [hoveringRight, setHoveringRight] = useState(false);

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

  return (
    <div
      className={`card w-1/2 bg-black rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] hover-effect ${hoveringUpper ? 'upper-hover' : ''} ${hoveringLower ? 'lower-hover' : ''} ${hoveringLeft ? 'left-hover' : ''} ${hoveringRight ? 'right-hover' : ''}`}
      onMouseMove={handleHover}
      onMouseLeave={() => {
        setHoveringUpper(false);
        setHoveringLower(false);
        setHoveringLeft(false);
        setHoveringRight(false);
      }}
    >
      <h1 className='text-2xl mt-[15px] underline uppercase font-bold text-white'>A Random Gif</h1>
      {loading ? <Spinner /> : <img src={gif} alt='Random Gif' width='450' />}
      <div className="cursor-effect" style={{ '--x': cursorPosition.x, '--y': cursorPosition.y }}></div>
      <button
        onClick={() => fetchData()}
        className='w-10/12 bg-custom-color text-lg py-2 rounded-lg mb-[20px] relative'
      >
        Generate
      </button>
    </div>
  );
};

export default Random;
