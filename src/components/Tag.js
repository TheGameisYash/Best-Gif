import React, { useState } from 'react';
import Spinner from './Spinner';
import useGif from '../hooks/useGif';
import './styles.css'; // Ensure this import is correct and the path is accurate

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {
  const [tag, setTag] = useState('');
  const { gif, loading, fetchData } = useGif();

  // Function to handle click and initiate animation
  const handleGenerateClick = () => {
    document.body.classList.add("animate"); // Apply animation to body
    setTimeout(() => {
      document.body.classList.remove("animate"); // Remove animation class after 1 second
    }, 1000);
    fetchData(tag); // Fetch new gif based on the tag
  };

  return (
    <div className='w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px] hover-effect'>
      <h1 className='text-2xl mt-[15px] underline uppercase font-bold'>Random {tag} Gif</h1>
      
      {loading ? (<Spinner/>) : (<img src={gif} width="450"/>)}

      <input
        className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
        onChange={(event) => setTag(event.target.value)}
        value={tag}
      />
      
      <button
        id="generateButton" // Added id for animation reference
        onClick={handleGenerateClick}
        className='w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]'
      >
        Generate
      </button>
    </div>
  );
};

export default Tag;
