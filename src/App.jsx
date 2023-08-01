// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './routes/BoardList';
import Home from './routes/Home';
import BoardDetail from './routes/BoardDetail';
import BoardWrite from './routes/BoardWrite';
import BoardUpdate from './routes/BoardUpdate';
import Error from './routes/Error';
import 'normalize.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<BoardList />} />
      <Route path="/board/:id" element={<BoardDetail />} />
      <Route path="/board/write" element={<BoardWrite />} />
      <Route path="/board/update/:id" element={<BoardUpdate />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default App;
