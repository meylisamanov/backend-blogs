import './App.css';
import Home from './components/Home';
import BlogDetail from './components/BlogDetail';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateBlog from './components/CreateBlog';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<BlogDetail />} />
          <Route path="/editor" element={<CreateBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
