import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (json.success) {
        setFoodItem(json.foodItems);
        setFoodCat(json.foodCategory);
      } else {
        console.error("❌ Error loading data from API");
      }
      setLoading(false);
    } catch (err) {
      console.error("⚠️ Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = foodItem.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      

      {/* Carousel and Search */}
      <div className="container mt-4 position-relative">
        <style>
          {`
            .carousel-img {
              height: 400px;
              width: 100%;
              object-fit: cover;
              object-position: center;
            }
            .carousel-search-bar {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 10;
              width: 60%;
              background-color: rgba(0, 0, 0, 0.4);
              padding: 10px 20px;
              border-radius: 10px;
            }
          `}
        </style>

        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
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

          {/* Search bar */}
          <div className="carousel-search-bar">
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search food..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

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

      {/* Food Items */}
      <div className="container mt-3">
        {search === '' ? (
          // Normal category-wise rendering
          foodCat?.map((category) => (
            <div key={category._id}>
              <h3 className="mt-4">{category.CategoryName}</h3>
              <div className="row">
                {foodItem
                  ?.filter(item => item.CategoryName === category.CategoryName)
                  .map((item) => (
                    <div className="col-12 col-md-4 col-lg-3" key={item._id}>
                      <Card
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        options={item.options[0]}
                        img={item.img}
                      />

                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          // Filtered rendering for search
          <div>
            <h3 className="mt-4">Search Results</h3>
            <div className="row">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div className="col-12 col-md-4 col-lg-3" key={item._id}>
                    <Card
                      name={item.name}
                      description={item.description}
                      options={item.options[0]}
                      img={item.img}
                    />
                  </div>
                ))
              ) : (
                <h5 className="text-danger">No food items found</h5>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
