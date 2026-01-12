import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChunkList from './components/ChunkList';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chunks" element={<ChunkList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 