import { Routes, Route } from "react-router-dom";

import { ProtectedLayout } from './ProtectedLayout';
import Login from './Login';
import Home from './Home';
import Hospitals from "./Hospitals";

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LoginLayout } from "./LoginLayout";

function App() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/" index element={<Login />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
      </Route>
    </Routes>
  );
}

export default App;
