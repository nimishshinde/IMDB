import React,{useState} from 'react';

function Pagination({pageNumber, goNext, goPrev}) {
  return (
    <>
    <div className='flex justify-center p-2'>
      <button  onClick={goPrev} className='border-2 border-indigo-600 p-2 border-r-0 rounded-l-lg text-1xl text-indigo-600'>Previous</button>
      <button className='bg-gray-300 border-2 border-indigo-600 p-2 text-indigo-600 text-1xl'>{pageNumber}</button>
      <button  onClick={goNext} className='border-2 border-indigo-600 p-2 border-l-0 rounded-r-lg text-1xl text-indigo-600'>Next</button>    
    </div>
    </>
  );
}

export default Pagination;
