import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@testing-library/jest-dom/extend-expect';
import RegionList from '../components/RegionList';

describe('RegionList', () => {
  it('renders RegionList component', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <RegionList />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
