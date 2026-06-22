import { render, screen } from '@testing-library/react';
import Results from './Results';

describe('Results', () => {
  test('empty array', () => {
    render(<Results items={[]} />);

    const heading = screen.queryByRole('heading');

    expect(heading).not.toBeInTheDocument();
  });

  test('the passed element is displayed with a name and description', () => {
    const item = [
      {
        id: 'test-id-1',
        name: 'Rick',
        description: 'Human',
        image: 'rick.jpg',
      },
    ];
    render(<Results items={item} />);

    const name = screen.getByText('Rick');
    const description = screen.getByText('Human');

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
