// RegionDetails.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRegions } from '../redux/region/regionSlice';
import './RegionList.css';

const RegionDetails = () => {
  const dispatch = useDispatch();
  const { regionId } = useParams();
  const regionIdAsNumber = parseInt(regionId, 10);

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const regions = useSelector((state) => state.regions.regions);
  const loading = useSelector((state) => state.regions.loading);
  const error = useSelector((state) => state.regions.error);

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const region = regions.find((r) => r.regionid === regionIdAsNumber);

  if (!region) {
    return <div>Region not found</div>;
  }

  return (
    <div>
      <div className="region-title">
        <div className="region-map"></div>
        <h2>{region.shortname}<br />
        <small>Forecast: {region.intensity.forecast}<br />{region.intensity.index}</small></h2>
      </div>
      <div className="region-head"><h3>Generation Mix</h3></div>
      <ul className="region-content">
        {region.generationmix.map((mix) => (
          <li className="region-content-links" key={mix.fuel}>
            {mix.fuel}: {mix.perc}%
          </li>
        ))}
      </ul>
  </div>
  );
};

export default RegionDetails;
