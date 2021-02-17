import { render, screen } from '@testing-library/react';
import { Wizard } from './Wizard';

test('renders correctly', () => {
    render(<Wizard />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
