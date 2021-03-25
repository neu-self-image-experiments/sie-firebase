import { render, screen } from '@testing-library/react';
import { AccountInfoPage } from './AccountInfoPage/AccountInfoPage';
import { AccountPage } from './AccountPage';

jest.mock('./AccountInfoPage/AccountInfoPage');

describe('<AccountPage/>', () => {
  beforeEach(() => {
    // mock AccountInfoPage implementation
    AccountInfoPage.mockImplementation(() => (
      <div data-testid="info page"></div>
    ));
  });
  it('renders correctly', async () => {
    // render component to test
    render(<AccountPage />);
    expect(screen.getByTestId('info-page')).toBeInTheDocument();
  });
});
