import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'
import './App.css'

function App() {
  console.log("API Key from .env:", import.meta.env.VITE_OPENWEATHER_API_KEY);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Check the console for your API Key</h1>
    </div>
  );
}

export default App;
