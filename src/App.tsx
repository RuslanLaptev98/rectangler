import React from 'react';
import Canvas from './Canvas';
import Header from './Header';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <Canvas />
    </div>
  );
};

export default App;
