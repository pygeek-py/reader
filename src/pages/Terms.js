import React from 'react';
import StaticPage from '../components/StaticPage';

const Terms = () => (
  <StaticPage eyebrow="Legal" title="Terms">
    <p>
      Reader is provided as a demonstration project, as-is, with no guarantee of uptime,
      accuracy, or continued availability.
    </p>
    <h2>Accounts</h2>
    <p>
      You're responsible for the accuracy of the information you provide and for keeping your
      password to yourself.
    </p>
    <h2>Content you add</h2>
    <p>
      Anything you add to the catalog should be information you have the right to share. This
      is a demo library, not a distribution platform for copyrighted material.
    </p>
    <h2>Changes</h2>
    <p>This project may change, be reset, or be taken offline at any time without notice.</p>
  </StaticPage>
);

export default Terms;
