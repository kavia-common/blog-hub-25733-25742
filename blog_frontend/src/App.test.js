import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand title', () => {
  render(<App />);
  const elt = screen.getByText(/Ocean Blog/i);
  expect(elt).toBeInTheDocument();
});
