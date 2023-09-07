import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRegions } from '../redux/region/regionSlice';
import { Link, useParams } from 'react-router-dom';
import './RegionList.css';
import arrow from './images/right-arrow.png';

const RegionList = () => {
  const { intensityIndex } = useParams();
  const dispatch = useDispatch();
  const regions = useSelector((state) => state.regions.regions);
  const loading = useSelector((state) => state.regions.loading);
  const error = useSelector((state) => state.regions.error);

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredRegions = intensityIndex
    ? regions.filter((region) => region.intensity.index === intensityIndex)
    : regions;

  return (
    <div>
      <div className="region-title">
        <div className={`region-map ${intensityIndex}`}></div>
        {intensityIndex ? (
          <h2>{intensityIndex}</h2>) : (<h2>All Regions</h2>
        )}
      </div>
      <div className="region-head"><h3>Region Summary</h3></div>
      <ul className="region-content">
        {filteredRegions.map((region) => (
          <li className="region-content-links" key={region.regionid}>
            <div className='region-name'>
              <Link to={`/region/${region.regionid}`}>{region.shortname}</Link>
            </div>
            <div className='region-details'>
              <Link to={`/region/${region.regionid}`}>
                Intensity Forecast: {region.intensity.forecast}<br />
                {!intensityIndex && (
                  <span>{region.intensity.index}</span>
                )}
              </Link>
            </div>
            <div className="region-next"><Link to={`/region/${region.regionid}`}><img src={arrow} /></Link></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionList;
