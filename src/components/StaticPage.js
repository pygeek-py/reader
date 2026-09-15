import React from 'react';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

const StaticPage = ({ eyebrow, title, children }) => (
  <div className="page">
    <SiteNav />
    <main className="page-content">
      <div className="container" style={{ maxWidth: 760, paddingTop: 48, paddingBottom: 72 }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginTop: 10, marginBottom: 28 }}>{title}</h1>
        <div className="stack gap-md static-page-body">{children}</div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default StaticPage;
