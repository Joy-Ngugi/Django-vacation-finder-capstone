import React from 'react';
import GoogleMapComponent from "./googleMap";

const Home = () => {
  return (
    <div className='mx-8'>
    <h1 className='text-center text-5xl font-bold mt-10'>Explore Central Kenya</h1>
    <p className='text-center my-5 text-2xl  '><i>Click on a pin to get directions from your current location.</i></p>
    <GoogleMapComponent />
  </div>
  );
};

export default Home;

