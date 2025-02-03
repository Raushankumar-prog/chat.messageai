import React from 'react';
import PropTypes from 'prop-types'; // For type checking

const Button = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    outline: 'border border-blue-500 hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded',
    // Add more variants as needed (e.g., 'danger', 'secondary')
  };

  const appliedClasses = `${variants[variant] || variants.default} ${className || ''}`;

  return (
    <button className={appliedClasses} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outline', 'danger', 'secondary']), // Define allowed variants
  className: PropTypes.string,
};

export default Button;