import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('renders Navbar component', () => {
    const { container } = render(
      <Router>
        <Navbar />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
