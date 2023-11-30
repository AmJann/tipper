import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddForm from './pages/AddForm';
import LandingPage from './pages/LandingPage';
import PostView from './pages/PostView';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<LandingPage />}>
        </Route>
        <Route index element={<HomePage />} />
        <Route path="add" element={<AddForm />} />
        <Route path="post/:id" element={<PostView />}></Route>
      </Routes>

    </div>
  );
}

export default App;
