import React from 'react';

function Layout({ children }) {
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="container">
          <h1 className="logo"><a href="/" className="logo-link">BuyBook</a></h1>
          <nav className="main-nav">
            {/* Здесь можно добавить другие ссылки */}
          </nav>
        </div>
      </header>
      <main className="site-main container">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} BuyBook. Все права защищены.</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
