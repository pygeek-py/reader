import React from 'react';
import StaticPage from '../components/StaticPage';

const About = () => (
  <StaticPage eyebrow="About Reader Library" title="A library catalog you can use from anywhere">
    <p>
      Reader Library puts the whole collection online. Search by title, author, or ISBN, see
      exactly how many copies are on the shelf, borrow what you find, and return it when you are
      done, without standing in a queue.
    </p>
    <h2>How the collection is organised</h2>
    <p>
      Every title carries a catalog number, a shelf mark (fiction is shelved by the first three
      letters of the author's surname), its genre, and publication details. Authors are built
      directly from the books we hold, so an author page always shows everything of theirs that
      is in the collection.
    </p>
    <h2>Borrowing at a glance</h2>
    <p>
      Members can borrow up to five books at a time, each for up to two weeks, and one copy of any
      given title. When every copy of a book is out, the book page shows when the next one is due
      back. See the Terms page for the full lending rules.
    </p>
  </StaticPage>
);

export default About;
