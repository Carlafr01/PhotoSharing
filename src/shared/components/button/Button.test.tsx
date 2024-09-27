import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with children text', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with default type="button"', () => {
    render(
      <Button type="button" onClick={() => {}}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('renders with a custom type="submit"', () => {
    render(
      <Button type="submit" onClick={() => {}}>
        Submit
      </Button>
    );
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('renders with custom type="reset"', () => {
    render(
      <Button type="reset" onClick={() => {}}>
        Reset
      </Button>
    );
    const buttonElement = screen.getByText('Reset');
    expect(buttonElement).toHaveAttribute('type', 'reset');
  });

  it('applies the custom className', () => {
    render(
      <Button className="test-class" onClick={() => {}}>
        Custom Class
      </Button>
    );
    const buttonElement = screen.getByText('Custom Class');
    expect(buttonElement).toHaveClass('custom-button');
    expect(buttonElement).toHaveClass('test-class');
  });
});
