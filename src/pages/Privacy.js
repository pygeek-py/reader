import React from 'react';
import StaticPage from '../components/StaticPage';

const Privacy = () => (
  <StaticPage eyebrow="Legal" title="Privacy">
    <p>
      Reader is a demonstration project, not a commercial service. This page describes what
      actually happens with your data in this build, plainly.
    </p>
    <h2>What's collected</h2>
    <p>
      Creating an account stores your username, email address, and a securely hashed password,
      never the password itself. Borrowing a book stores the book, an imprint, and a due date
      against your account so "My Books" can show it back to you.
    </p>
    <h2>What isn't collected</h2>
    <p>
      No analytics, no tracking cookies, no third-party advertising, and nothing is sold or
      shared with anyone. There's no one to sell it to. This is a single-application demo, not
      a company.
    </p>
    <h2>Email</h2>
    <p>
      Your email is used only to send password-reset links if you request one. It isn't used
      for marketing.
    </p>
  </StaticPage>
);

export default Privacy;
