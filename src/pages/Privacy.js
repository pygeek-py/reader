import React from 'react';
import StaticPage from '../components/StaticPage';

const Privacy = () => (
  <StaticPage eyebrow="Legal" title="Privacy">
    <p>
      This page explains, plainly, what Reader Library keeps about its members and why.
    </p>
    <h2>What we keep</h2>
    <p>
      Creating an account stores your username, email address, and a securely hashed password,
      never the password itself. Borrowing a book records which title you have, the edition, and
      the due date against your account, so My Books can show it back to you and so we know which
      copies are out.
    </p>
    <h2>What we don't do</h2>
    <p>
      No analytics, no tracking cookies, and no third-party advertising. Your borrowing history
      is never sold or shared. Other members can see that a copy is on loan and when it is due
      back, but never who has it.
    </p>
    <h2>Email</h2>
    <p>
      Your email is used only to send the link that confirms your account and, if you ask for
      one, a password-reset link. It isn't used for marketing.
    </p>
  </StaticPage>
);

export default Privacy;
