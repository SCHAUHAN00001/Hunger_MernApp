import React from 'react';
import './Carousel.css';

export default function Carousel() {
  return (
    <div className="container mt-4 position-relative">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80"
              className="d-block w-100 carousel-img"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=80"
              className="d-block w-100 carousel-img"
              alt="Momos"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://as1.ftcdn.net/v2/jpg/01/33/61/72/1000_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg"
              className="d-block w-100 carousel-img"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://imgs.search.brave.com/hEuLhcScpxZC4ROYHvwh4JZegZiQPvZJQ9y7Vs1Itmk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTgv/Mjg1LzI0Ni9zbWFs/bC9kZWxpY2lvdXNs/eS1ncmlsbGVkLWNo/ZWVzZS1zYW5kd2lj/aC13aXRoLWZyZXNo/LWdyZWVucy1hbmQt/dG9tYXRvZXMtc2Vy/dmVkLW9uLXJ1c3Rp/Yy1zbGF0ZS1waG90/by5qcGVn"
              className="d-block w-100 carousel-img"
              alt="Grill Sandwich"
            />
          </div>
        </div>

        {/* Search bar overlay */}
        <div className="carousel-search-bar position-absolute top-50 start-50 translate-middle w-75">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}



