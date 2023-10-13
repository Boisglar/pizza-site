import { fireEvent, render, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Search from '.';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Search', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockImplementation(() => mockDispatch);

  test('reders Search component', () => {
    const { getByPlaceholderText } = render(<Search />);
    const inputElement = getByPlaceholderText('Поиск пиццы...');
    expect(inputElement).toBeDefined();
  });

  test('typing in the input field updates the value', () => {
    const { getByPlaceholderText } = render(<Search />);
    const inputElement = getByPlaceholderText('Поиск пиццы...');
    fireEvent.change(inputElement, { target: { value: 'test value' } });
    expect(inputElement.value).toBe('test value');
  });
  // test('clicking the clear icon clears the input and dispatches an action', () => {
  //   const { getByPlaceholderText, getByText } = render(<Search />);
  //   const inputElement = getByPlaceholderText('Поиск пиццы...');

  //   fireEvent.change(inputElement, { target: { value: 'test value' } });
  //   const clearIcon = getByText('☓');
  //   fireEvent.click(clearIcon);
  //   expect(inputElement.value).toBe('');
  // expect(mockDispatch).toHaveBeenCalledWith({ type: 'filter/setSearchValue', payload: '' });
  // });

  // test('clicking the clear icon clears the input and dispatches an action', () => {
  //   const { getByPlaceholderText, getByText } = render(<Search />);
  //   const inputElement = getByPlaceholderText('Поиск пиццы...');

  //   fireEvent.change(inputElement, { target: { value: 'test value' } });
  //   const clearIcon = getByText('☓');
  //   fireEvent.click(clearIcon);

  //   expect(inputElement.value).toBe('');
  //   expect(mockDispatch).toHaveBeenCalledWith({ type: 'filter/setSearchValue', payload: '' });
  // });
});
