import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders login page when not authenticated', () => {
  // Clear any existing authentication
  localStorage.clear();
  const { getByText } = render(<App />);
  // Check if login page is rendered
  expect(getByText(/LOGIN/i)).toBeInTheDocument();
});
