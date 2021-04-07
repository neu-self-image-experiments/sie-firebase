import React from 'react';
import { render } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { AddExperiment } from './AddExperiment';

configure({ adapter: new Adapter() });

// AddExperiment page test suite
describe('<AddExperiment />', () => {
  // Test header text is rendered and button shows up
  it('renders correctly', () => {
    const { getAllByText } = render(<AddExperiment />);
    expect(getAllByText(/Add New Experiment/i)).toHaveLength(2);
  });
});
