import React from 'react';

/**
 * A span styled and behaving like a link (used for in-app navigation via
 * useHistory instead of a real href), but keyboard-operable like a real
 * interactive element, unlike a plain onClick <a> or <span>.
 */
const LinkButton = ({ onClick, className = '', children, ...rest }) => (
  <span
    role="link"
    tabIndex={0}
    className={className}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e);
      }
    }}
    {...rest}
  >
    {children}
  </span>
);

export default LinkButton;
