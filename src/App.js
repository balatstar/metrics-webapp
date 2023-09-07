import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import NotMatch from './components/NotMatch';
import RegionList from './components/RegionList';
import RegionDetails from './components/RegionDetails';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="region" element={<RegionList intensityFilter={null} />} />
          <Route path="intensity/:intensityIndex" element={<RegionList />} />
          <Route path="/region/:regionId" element={<RegionDetails />} />
          <Route path="*" element={<NotMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
