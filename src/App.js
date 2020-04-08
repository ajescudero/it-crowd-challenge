import React from 'react';
import Forecast from "./Components/Forecast/Forecast";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Challenge</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <footer>
        Page created by Aldo Escudero
      </footer>
    </div>
  );

}

export default App;