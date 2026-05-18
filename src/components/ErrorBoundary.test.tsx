import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  test('successful render', () => {
    render(
      <ErrorBoundary fallback={<div>Error</div>}>
        <p>children</p>
      </ErrorBoundary>
    );

    const children = screen.getByText('children');
    const fallback = screen.queryByText('Error');

    expect(fallback).not.toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  test('', () => {
    const TestError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={<div>Error</div>}>
        <TestError />
        <p>children</p>
      </ErrorBoundary>
    );

    const testError = screen.getByText('Error');
    const children = screen.queryByText('children');

    expect(testError).toBeInTheDocument();
    expect(children).not.toBeInTheDocument();
  });
});
