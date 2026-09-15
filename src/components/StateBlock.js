import React from 'react';
import { ExclamationCircleIcon, InboxIcon } from '@heroicons/react/24/outline';

/**
 * One consistent component for every loading / empty / error moment in the
 * app, so no page is left staring at a blank screen mid-fetch or on failure.
 */
const StateBlock = ({ variant = 'empty', title, text, icon: CustomIcon, children }) => {
  if (variant === 'loading') {
    return (
      <div className="state-block">
        <span className="spinner" aria-hidden="true" />
        <p className="state-block-text">{title || 'Loading...'}</p>
      </div>
    );
  }

  const Icon = CustomIcon || (variant === 'error' ? ExclamationCircleIcon : InboxIcon);

  return (
    <div className={`state-block ${variant === 'error' ? 'state-block--error' : ''}`}>
      <Icon className="state-block-icon" aria-hidden="true" />
      {title && <h3 className="state-block-title">{title}</h3>}
      {text && <p className="state-block-text">{text}</p>}
      {children}
    </div>
  );
};

export default StateBlock;
