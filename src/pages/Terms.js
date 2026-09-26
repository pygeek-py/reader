import React from 'react';
import StaticPage from '../components/StaticPage';

const Terms = () => (
  <StaticPage eyebrow="Legal" title="Terms of use">
    <p>
      These terms cover your use of the Reader Library catalog and lending service. By creating an
      account you agree to them.
    </p>
    <h2>Membership</h2>
    <p>
      You're responsible for the accuracy of the information you provide and for keeping your
      password to yourself. New accounts must confirm a real, working email address before they
      can sign in. Loans made through your account are your responsibility.
    </p>
    <h2>Borrowing rules</h2>
    <p>
      Members may have up to five books on loan at any one time, may hold one copy of any given
      title, and may choose a due date up to two weeks from the day they borrow. A book can only
      be borrowed while at least one copy is available. Please return books by their due date so
      other members can read them; overdue loans are flagged on your My Books page.
    </p>
    <h2>Returns</h2>
    <p>
      Return a book from My Books when you have finished with it. Returning frees the copy for the
      next member straight away.
    </p>
    <h2>Changes</h2>
    <p>The service, the collection, and these terms may change from time to time.</p>
  </StaticPage>
);

export default Terms;
