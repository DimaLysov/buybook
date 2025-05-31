import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import BookDetail from './pages/BookDetail';
import AuthorDetail from './pages/AuthorDetail';

import './App.css';
import './styles/Book.css';
import './styles/BookDetail.css';
import './styles/Home.css';
import './styles/Layout.css';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="app">
        <Layout>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/author/:id" element={<AuthorDetail />} />
          </Routes>
        </main>
        </Layout>
      </div>
    </Router>
    </div>
    
  );
}

export default App;