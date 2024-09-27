import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ButtonLink from './ButtonLink';

describe('ButtonLink Component', () => {
  it('renders the link with correct text', () => {
    render(
      <MemoryRouter>
        <ButtonLink text="Go to Home" to="/home" />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Go to Home');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders the link with correct href', () => {
    render(
      <MemoryRouter>
        <ButtonLink text="Go to Home" to="/home" />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Go to Home');
    expect(linkElement).toHaveAttribute('href', '/home');
  });

  it('renders the link as a button', () => {
    render(
      <MemoryRouter>
        <ButtonLink text="Go to About" to="/about" />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Go to About');
    expect(linkElement).toHaveClass('button-link');
  });
});
