import React from 'react';
import './button.css';

export default function Button({
  children,
  variant = 'primary',   
  size = 'small',        
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  className = ''
}) {
  const classes = `btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="btn_icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
