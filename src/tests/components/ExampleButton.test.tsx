import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExampleButton from '../../components/ExampleButton';

describe('ExampleButton', () => {
  it('renders with label', () => {
    render(<ExampleButton label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ExampleButton label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('example-button'));
    expect(handleClick).toHaveBeenCalled();
  });
});