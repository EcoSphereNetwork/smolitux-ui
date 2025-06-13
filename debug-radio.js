const { render, screen } = require('@testing-library/react');
const React = require('react');
const RadioA11y = require('./packages/@smolitux/core/src/components/Radio/Radio.a11y.tsx').default;

// Simple test to see DOM structure
const { container } = render(
  React.createElement(RadioA11y, {
    name: "test",
    value: "option1", 
    label: "Option 1",
    required: true,
    ariaLabel: "Erste Option"
  })
);

console.log('DOM Structure:');
console.log(container.innerHTML);