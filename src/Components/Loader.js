import React from 'react';
import loader from '../../Assests/Gif/load3.gif';
import '../../StyleSheet/Loader.scss';

const LoaderComponents = () => {
  return (
    <div className='loader_wrapper'>
      <div className='loader_inner_wrapper'>
        <img src={loader}></img>
      </div>
    </div>
  )
}

export default LoaderComponents;