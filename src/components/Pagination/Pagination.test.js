import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '.';

describe('Pagination component', () => {
  it('should render with the current page', () => {
    const { getByText } = render(<Pagination onChangePage={() => {}} currentPage={1} />);
    const currentPageElement = getByText('1');
    expect(currentPageElement).toBeTruthy();
  });

  it('should trigger onChangePage when clicking on the next button', () => {
    const onChangePageMock = jest.fn();
    const { getByText } = render(<Pagination onChangePage={onChangePageMock} currentPage={1} />);
    const nextButton = getByText('>');
    fireEvent.click(nextButton);
    expect(onChangePageMock).toHaveBeenCalledWith(2);
  });

  it('should trigger onChangePage when clicking on the previous button', () => {
    const onChangePageMock = jest.fn();
    const { getByText } = render(<Pagination onChangePage={onChangePageMock} currentPage={2} />);
    const previousButton = getByText('<');
    fireEvent.click(previousButton);
    expect(onChangePageMock).toHaveBeenCalledWith(1);
  });
});
