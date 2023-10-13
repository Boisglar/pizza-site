import { render } from '@testing-library/react';
import NotFound from '../../pages/NotFound';

describe('NotFoundBlock component', () => {
  it('should render the component', () => {
    const { getByText } = render(<NotFound />);
    const emojiElement = getByText('😕');
    const headerElement = getByText('Ничего не найдено');
    const descriptionElement = getByText(
      'К сожалению данная страница отсутвует в нашем интернет-магазине',
    );

    expect(emojiElement).toBeTruthy();
    expect(headerElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
  });
  it('должен иметь правильный класс CSS', () => {
    const { container } = render(<NotFound />);
    const rootelement = container.querySelector('.root');

    expect(rootelement).toBeTruthy();
  });
});
