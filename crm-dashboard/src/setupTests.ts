// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// Mock ESM-only lucide-react for Jest (CRA jest can't transform ESM in node_modules)
// Provide simple SVG components for used icons
jest.mock('lucide-react', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  const Icon = (props: any) => React.createElement('svg', props);
  return { Bell: Icon, Search: Icon, MessageCircle: Icon };
});
