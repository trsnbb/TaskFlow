import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import { Provider } from "react-redux";

import HomePage from "./pages/HomePage/HomePage";
import FriendPage from "./pages/FriendPage/FriendPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import TaskPage from "./pages/TaskPage/TaskPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import store from "./redux/store";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/friends' element={<FriendPage />} />
            <Route path='/messages' element={<MessagePage />} />
            <Route path='/tasks' element={<TaskPage />} />
            <Route path='/tasks/:projectId' element={<ProjectDetailPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
