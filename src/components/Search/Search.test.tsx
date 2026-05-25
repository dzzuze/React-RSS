import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Search from './Search';

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem');
  vi.spyOn(Storage.prototype, 'setItem');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Search', () => {
  it('should renders the input field and button', () => {
    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('when installing a component, the value from localStorage is specified in the input field, if it is there', () => {
    vi.mocked(Storage.prototype.getItem).mockReturnValue('Rick');

    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Rick');
  });

  test('when user will taping on keyboard, input update', async () => {
    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Rick');

    expect(input).toHaveValue('Rick');
  });

  test('save value into localeStorage', async () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '  Rick  ');

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('Rick');

    expect(vi.mocked(Storage.prototype.setItem)).toHaveBeenCalledWith(
      'searchTermTemp',
      'Rick'
    );
  });

  test('when input contains character name and this name save into localStorage, click dont call onSearch and dont save setItem', async () => {
    vi.mocked(Storage.prototype.getItem).mockReturnValue('Rick');

    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
    expect(vi.mocked(Storage.prototype.setItem)).not.toHaveBeenCalled();
  });
});
