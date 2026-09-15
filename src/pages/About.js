import React from 'react';
import StaticPage from '../components/StaticPage';

const About = () => (
  <StaticPage eyebrow="About Reader" title="A calmer way to keep track of what you read">
    <p>
      Reader started from a simple frustration: library catalogs are usually either bare-bones
      spreadsheets or bloated systems built for institutions, not readers. There wasn't a
      middle ground: something that just shows you what's in the catalog, who wrote it, and
      what you currently have borrowed, without getting in the way.
    </p>
    <p>
      This build focuses on three things: a catalog that's easy to browse and search, author
      pages that are built directly from the books that exist (no empty profiles, no manual
      upkeep), and a simple, honest borrowing flow: pick a book, set a due date, and it shows
      up in your own list.
    </p>
    <p>
      This is a demonstration project. There's no company behind it, no waitlist, and nothing
      for sale. It exists to show what a well-considered version of this kind of product could
      look like, end to end: authentication with real email verification, a derived author
      system, and a design system built for the product rather than borrowed from a template.
    </p>
  </StaticPage>
);

export default About;
