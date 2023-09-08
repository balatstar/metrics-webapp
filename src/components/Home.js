import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRegions } from '../redux/region/regionSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const uniqueIntensityIndexValues = useSelector(
    (state) => state.regions.uniqueIntensityIndexValues,
  );
  const lowestForecastValues = useSelector(
    (state) => state.regions.lowestForecastValues,
  );
  const loading = useSelector((state) => state.regions.loading);
  const error = useSelector((state) => state.regions.error);

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:&nbsp;
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="home-title">
        <div className="home-map" />
        <h2>United Kingdom</h2>
      </div>
      <div className="home-head"><h3>Regions by Intensity Index</h3></div>
      <ul className="home-content">
        {uniqueIntensityIndexValues.map((intensityIndex) => (
          <li className={`home-content-links ${intensityIndex}`} key={intensityIndex}>
            <Link to={`/intensity/${intensityIndex}`}>
              <span className="home-content-desc">
                {intensityIndex}
                &nbsp;
                Intensity
              </span>
              <br />
              Lowest forecast:&nbsp;
              {lowestForecastValues[intensityIndex] || 'N/A'}
            </Link>
          </li>
        ))}
        <li className="home-content-links all">
          <Link to="region">
            <span className="home-content-desc">All Regions</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
