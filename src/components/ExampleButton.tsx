import React from 'react';

type ExampleButtonProps = {
  label: string;
  onClick?: () => void;
};

const ExampleButton: React.FC<ExampleButtonProps> = ({ label, onClick }) => (
  <button
    className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition"
    onClick={onClick}
    data-testid="example-button"
  >
    {label}
  </button>
);

export default ExampleButton; 