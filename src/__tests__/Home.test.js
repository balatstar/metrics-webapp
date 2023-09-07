import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@testing-library/jest-dom/extend-expect';
import Home from '../components/Home';

describe('Home', () => {
  it('renders Home component', () => {
    const { container } = render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
