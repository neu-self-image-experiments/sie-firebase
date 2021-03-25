import { render } from '@testing-library/react';
import App from './App';
import { AuthContext } from './contexts/auth-provider';

jest.mock('react-router');
jest.mock('./stories/components/PrivateRoute/PrivateRoute');
test('renders learn react link', () => {
  const user = jest.fn();
  render(
    <AuthContext.Provider value={{ user }}>
      <App />
    </AuthContext.Provider>,
  );
});
