import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('should show card with name, description and image props', () => {
    const props = { name: 'Rick', description: 'Human', image: 'string' };

    render(<Card {...props} />);

    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();

    const cardImg = screen.getByRole('img');

    expect(cardImg).toHaveAttribute('src', 'string');
    expect(cardImg).toHaveAttribute('alt', 'Rick');
  });
});
