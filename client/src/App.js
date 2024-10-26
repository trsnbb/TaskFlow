import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";

import HomePage from "./pages/HomePage/HomePage";
import FriendPage from "./pages/FriendPage/FriendPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import TaskPage from "./pages/TaskPage/TaskPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/friends' element={<FriendPage />} />
        <Route path='/messages' element={<MessagePage />} />
        <Route path='/tasks' element={<TaskPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
