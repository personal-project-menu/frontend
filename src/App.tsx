import React from 'react';
import WithDataPage from './pages/withData'
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
          <Route path="/data" element={<WithDataPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
