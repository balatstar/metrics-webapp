import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@testing-library/jest-dom/extend-expect';
import RegionDetails from '../components/RegionDetails';

describe('RegionDetails', () => {
  it('renders RegionDetails component', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <RegionDetails />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
