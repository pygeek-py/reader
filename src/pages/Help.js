import React from 'react';
import StaticPage from '../components/StaticPage';

const FAQS = [
  {
    q: "I signed up but can't sign in.",
    a: 'New accounts need to verify their email first. Check your inbox for a verification link, or use "Resend the verification email" on the sign-in page.',
  },
  {
    q: "I didn't get the verification or reset email.",
    a: "Double-check the address you signed up with, and check spam. You can request a new link from the sign-in page at any time.",
  },
  {
    q: 'How do I borrow a book?',
    a: 'Open any book\'s page and select "Borrow this book." You\'ll set an imprint and due date, and it will appear under My Books.',
  },
  {
    q: 'Why do some books show the same author?',
    a: "Authors on Reader aren't managed separately: they're derived from the books in the catalog, so an author with multiple books just shows up once with all of them listed.",
  },
  {
    q: "How do I add a book?",
    a: 'Once signed in, use "Add a Book" from the account menu. The book will be listed under your account as its author.',
  },
];

const Help = () => (
  <StaticPage eyebrow="Support" title="Help Center">
    <div>
      {FAQS.map((item) => (
        <div className="faq-item" key={item.q}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  </StaticPage>
);

export default Help;
