import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar title', () => {
  render(<App />);
  expect(screen.getByText(/All Client Data/i)).toBeInTheDocument();
});
