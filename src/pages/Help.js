import React from 'react';
import StaticPage from '../components/StaticPage';

const FAQS = [
  {
    q: "I signed up but can't sign in.",
    a: 'New accounts need to confirm their email first. Open the link we emailed you, or use "Resend the confirmation email" on the sign-in page. Otherwise, double-check your username and password.',
  },
  {
    q: "I didn't get the confirmation or password reset email.",
    a: "Check your spam folder and double-check the address you signed up with. It can take a minute or two to arrive. You can ask for a new confirmation link from the sign-in page, or a new reset link from the forgot-password page, at any time.",
  },
  {
    q: 'How do I borrow a book?',
    a: 'Open any book\'s page and select "Borrow this book." You\'ll pick a due date up to two weeks out, and it will appear under My Books. You can have five books on loan at a time.',
  },
  {
    q: 'A book says all copies are on loan. What can I do?',
    a: "The book's page shows when the next copy is due back. Once someone returns it, it becomes available to borrow again. Use the \"Available now\" filter on the catalog to see only what you can borrow today.",
  },
  {
    q: 'How do I return a book?',
    a: 'Open My Books from the account menu and choose "Return this book" on the loan. The copy goes straight back on the shelf.',
  },
  {
    q: 'Why do some books show the same author?',
    a: "Authors on Reader aren't managed separately: they're derived from the books in the catalog, so an author with multiple books just shows up once with all of them listed.",
  },
  {
    q: "How do I add a book?",
    a: 'Adding to the catalog is limited to admin accounts. If you have admin access, use "Add a Book" from the account menu.',
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
