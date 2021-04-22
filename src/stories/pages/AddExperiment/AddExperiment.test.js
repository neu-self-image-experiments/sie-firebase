import React from 'react';
import { render } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { AddExperiment } from './AddExperiment';
import { AuthContext } from '../../../contexts/auth-provider';

configure({ adapter: new Adapter() });

// AddExperiment page test suite
describe('<AddExperiment />', () => {
  // Test header text is rendered and button shows up
  it('renders correctly', () => {
    const user = jest.fn();
    const { getAllByText } = render(
      <AuthContext.Provider value={{ user }}>
        <AddExperiment />
      </AuthContext.Provider>,
    );
    expect(getAllByText(/Add New Experiment/i)).toHaveLength(2);
  });
});
