import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://api.punkapi.com/v2/beers')
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search beers..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={beer.image_url} className="card-img-top" alt={beer.name} />
              <div className="card-body">
                <h5 className="card-title">{beer.name}</h5>
                <p className="card-text tagline">{beer.tagline}</p>
                <p className="card-text">ABV: {beer.abv}%</p>
                <p className="card-text">IBU: {beer.ibu}</p>
                <p className="card-text">{beer.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
