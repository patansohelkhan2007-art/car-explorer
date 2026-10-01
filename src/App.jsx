import { useState } from "react";
import "./App.css";
import Cars from "./Cars";

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [compareCars, setCompareCars] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = (car) => {
    setCompareCars((current) => {
      const alreadyAdded = current.some(
        (item) => item.name === car.name
      );

      if (alreadyAdded) {
        return current.filter(
          (item) => item.name !== car.name
        );
      }

      if (current.length >= 3) {
        alert("You can compare maximum 3 cars.");
        return current;
      }

      return [...current, car];
    });
  };

  const removeCompare = (carName) => {
    setCompareCars((current) =>
      current.filter((car) => car.name !== carName)
    );
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          CAR<span>EXPLORER</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#cars">Cars</a>

          <button
            className="compare-nav-button"
            onClick={() => {
              setSelectedCar(null);
              setShowCompare(true);
            }}
          >
            Compare
            {compareCars.length > 0 && (
              <span className="compare-count">
                {compareCars.length}
              </span>
            )}
          </button>

          <a href="#about">About</a>
        </nav>
      </header>

      {/* HOME */}
      {!selectedCar && !showCompare && (
        <section className="hero" id="home">

          <p>THE FUTURE OF CAR EXPLORATION</p>

          <h1>
            Find Your
            <br />
            Dream Car
          </h1>

          <h2>
            Explore, compare and discover the perfect car for you.
          </h2>

          <button
            onClick={() =>
              document
                .getElementById("cars")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Cars →
          </button>

        </section>
      )}

      {/* COMPARE PAGE */}
      {showCompare ? (
        <section className="compare-page">

          <button
            className="back-button"
            onClick={() => setShowCompare(false)}
          >
            ← Back
          </button>

          <p className="section-subtitle">
            CAR COMPARISON
          </p>

          <h1>Compare Cars</h1>

          {compareCars.length === 0 ? (
            <div className="empty-compare">
              <h2>No cars selected</h2>

              <p>
                Go to the Cars section and select cars
                to compare.
              </p>

              <button
                onClick={() => setShowCompare(false)}
              >
                Explore Cars →
              </button>
            </div>
          ) : (
            <>
              <div className="comparison-table">

                <div className="comparison-row heading-row">
                  <div>Specification</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.name}
                    </div>
                  ))}
                </div>

                <div className="comparison-row">
                  <div>Price</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.price}
                    </div>
                  ))}
                </div>

                <div className="comparison-row">
                  <div>Engine</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.engine}
                    </div>
                  ))}
                </div>

                <div className="comparison-row">
                  <div>Power</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.power}
                    </div>
                  ))}
                </div>

                <div className="comparison-row">
                  <div>Fuel</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.fuel}
                    </div>
                  ))}
                </div>

                <div className="comparison-row">
                  <div>Transmission</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.transmission}
                    </div>
                  ))}
                </div>

                <div className="comparison-row">
                  <div>Mileage</div>

                  {compareCars.map((car) => (
                    <div key={car.name}>
                      {car.mileage}
                    </div>
                  ))}
                </div>

              </div>

              <div className="compare-actions">

                {compareCars.map((car) => (
                  <button
                    key={car.name}
                    onClick={() =>
                      removeCompare(car.name)
                    }
                  >
                    Remove {car.name}
                  </button>
                ))}

                <button
                  onClick={() => setCompareCars([])}
                >
                  Clear All
                </button>

              </div>
            </>
          )}

        </section>
      ) : (
        <Cars
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          compareCars={compareCars}
          toggleCompare={toggleCompare}
        />
      )}

    </div>
  );
}

export default App;