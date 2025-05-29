import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading data from api/i)).toBeInTheDocument();
  });

  test('renders SampleSizeCalculator after loading', async () => {
    render(<App />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/loading data from api/i)).not.toBeInTheDocument();
    });

    // Check if SampleSizeCalculator is rendered with correct props
    const sampleSizeCalculator = screen.getByTestId('sample-size-calculator');
    expect(sampleSizeCalculator).toBeInTheDocument();
  });

  test('passes correct props to SampleSizeCalculator', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading data from api/i)).not.toBeInTheDocument();
    });

    // Verify the props passed to SampleSizeCalculator
    const sampleSizeCalculator = screen.getByTestId('sample-size-calculator');
    expect(sampleSizeCalculator).toHaveAttribute('data-lot-size', '2000');
    expect(sampleSizeCalculator).toHaveAttribute('data-inspection-level', 'II');
    expect(sampleSizeCalculator).toHaveAttribute('data-sample-size', '125');
  });
});
