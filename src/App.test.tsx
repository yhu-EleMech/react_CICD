import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mocks for assets (optional, but prevents errors if test environment can't handle image imports)
vi.mock('./assets/react.svg', () => ({ default: 'react.svg' }));
vi.mock('/vite.svg', () => ({ default: 'vite.svg' }));

describe('App', () => {
  // Test case 1: Ensures the main heading is rendered correctly
  it('renders the main heading', () => {
    render(<App />);
    
    // Check if the H1 element with the text "Vite + React" is present
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Vite + React');
  });

  // Test case 2: Verifies the initial state of the counter button
  it('displays the initial count of 0', () => {
    render(<App />);

    // Check if a button with the text "count is 0" exists
    expect(screen.getByRole('button')).toHaveTextContent('count is 0');
  });

  // Test case 3: Tests the interactivity of the counter button
  it('increments the count when the button is clicked', () => {
    render(<App />);

    const counterButton = screen.getByRole('button');

    // Simulate a user click event
    fireEvent.click(counterButton);

    // After the click, expect the button text to update to "count is 1"
    expect(counterButton).toHaveTextContent('count is 1');
    
    // Simulate another click
    fireEvent.click(counterButton);
    
    // Expect the text to update to "count is 2"
    expect(counterButton).toHaveTextContent('count is 2');
  });

  // Test case 4: Verifies the presence of all links and logos
  it('renders Vite and React links with appropriate logos', () => {
    render(<App />);

    // Check for links with specific href attributes
    const viteLink = screen.getByRole('link', { name: /Vite logo/i });
    const reactLink = screen.getByRole('link', { name: /React logo/i });

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
    
    // Check for alt text of the images within the links
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();
  });
});