import React, { useRef } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import SearchResults from './components/SearchResults';
import LoadingBar from "react-top-loading-bar";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const loadingBar = useRef(null); 

  const setProgress = (type) => {
    if (type === 'start') {
      loadingBar.current && loadingBar.current.continuousStart();
    } else if (type === 'done') {
      loadingBar.current && loadingBar.current.complete();
    }
  };

  const country = "us";
  const pagesize = 15;

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" ref={loadingBar} />

        <Routes>
          <Route path="/search" element={<SearchResults setProgress={setProgress} />} />
          <Route path="/sports" element={<News setProgress={setProgress} category="sports" country={country} pagesize={pagesize} key="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} category="technology" country={country} pagesize={pagesize} key="technology" />} />
          <Route path="/science" element={<News setProgress={setProgress} category="science" country={country} pagesize={pagesize} key="science" />} />
          <Route path="/health" element={<News setProgress={setProgress} category="health" country={country} pagesize={pagesize} key="health" />} />
          <Route path="/general" element={<News setProgress={setProgress} category="general" country={country} pagesize={pagesize} key="general" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} category="entertainment" country={country} pagesize={pagesize} key="entertainment" />} />
          <Route path="/business" element={<News setProgress={setProgress} category="business" country={country} pagesize={pagesize} key="business" />} />
          <Route path="/" element={<News setProgress={setProgress} category="general" country={country} pagesize={pagesize} key="default" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
