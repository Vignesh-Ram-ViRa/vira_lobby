import React from 'react';
import './TravelGrid.css';
import TravelCard from '../TravelCard';

const TravelGrid = ({ trips }) => {
  return (
    <div className="travel-grid">
      <div className="travel-grid-container">
        {trips.map(trip => (
          <TravelCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default TravelGrid; 