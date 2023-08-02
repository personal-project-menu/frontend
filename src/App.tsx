import React from 'react';
import MainPage from './pages/main'
import LeftSpacePage from './pages/leftSpace'
import {Routes, Route, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/left" element={<LeftSpacePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
