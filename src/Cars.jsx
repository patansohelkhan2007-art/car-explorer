import { useState } from "react";
import Car3D from "./Car3D";

function Cars() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedView, setSelectedView] = useState("front");

  const companies = {
    "BMW Group": {
      brand: "BMW",
      logo: "/logos/bmw-logo.png",

      models: {
        M4: [
          {
            variant: "M4 Competition",
            type: "Coupe",
            fuel: "Petrol",
            price: "₹1.53 Crore",
            engine: "3.0L Twin-Turbo",
            power: "503 HP",
            transmission: "8-Speed Automatic",
            mileage: "10.2 km/l",
            modelPath: "/models/bmw-m4.glb",
          },
          {
            variant: "M4 Competition xDrive",
            type: "Coupe",
            fuel: "Petrol",
            price: "₹1.58 Crore",
            engine: "3.0L Twin-Turbo",
            power: "523 HP",
            transmission: "8-Speed Automatic",
            mileage: "9.8 km/l",
            modelPath: "/models/bmw-m4.glb",
          },
        ],
      },
    },

    "Mercedes-Benz Group": {
      brand: "Mercedes-Benz",
      logo: "/logos/mercedes-logo.png",

      models: {
        "C-Class": [
          {
            variant: "C 200",
            type: "Sedan",
            fuel: "Petrol",
            price: "₹61 Lakh",
            engine: "2.0L Turbo",
            power: "201 HP",
            transmission: "9-Speed Automatic",
            mileage: "16.9 km/l",
            modelPath: "/models/mercedes-c-class.glb",
          },
          {
            variant: "C 300",
            type: "Sedan",
            fuel: "Petrol",
            price: "₹70 Lakh",
            engine: "2.0L Turbo",
            power: "255 HP",
            transmission: "9-Speed Automatic",
            mileage: "15.5 km/l",
            modelPath: "/models/mercedes-c-class.glb",
          },
        ],
      },
    },

    "Volkswagen Group": {
      brand: "Audi",
      logo: "/logos/audi-logo.png",

      models: {
        A6: [
          {
            variant: "A6 Premium",
            type: "Sedan",
            fuel: "Petrol",
            price: "₹64 Lakh",
            engine: "2.0L Turbo",
            power: "245 HP",
            transmission: "7-Speed Automatic",
            mileage: "14.1 km/l",
            modelPath: "/models/audi-a6.glb",
          },
          {
            variant: "A6 Technology",
            type: "Sedan",
            fuel: "Petrol",
            price: "₹70 Lakh",
            engine: "2.0L Turbo",
            power: "245 HP",
            transmission: "7-Speed Automatic",
            mileage: "14.1 km/l",
            modelPath: "/models/audi-a6.glb",
          },
        ],
      },
    },

    "Hyundai Motor Group": {
      brand: "Hyundai",
      logo: "/logos/hyundai-logo.png",

      models: {
        Creta: [
          {
            variant: "Creta E",
            type: "SUV",
            fuel: "Petrol",
            price: "₹11 Lakh",
            engine: "1.5L Petrol",
            power: "115 HP",
            transmission: "Manual",
            mileage: "17.4 km/l",
            modelPath: "/models/hyundai-creta.glb",
          },
          {
            variant: "Creta SX",
            type: "SUV",
            fuel: "Petrol",
            price: "₹16 Lakh",
            engine: "1.5L Petrol",
            power: "115 HP",
            transmission: "CVT",
            mileage: "17.4 km/l",
            modelPath: "/models/hyundai-creta.glb",
          },
        ],
      },
    },

    "Tesla, Inc.": {
      brand: "Tesla",
      logo: "/logos/tesla-logo.png",

      models: {
        "Model 3": [
          {
            variant: "Model 3 RWD",
            type: "Sedan",
            fuel: "Electric",
            price: "₹45 Lakh",
            engine: "Electric Motor",
            power: "283 HP",
            transmission: "Single Speed",
            mileage: "Electric",
            modelPath: "/models/tesla-model-3.glb",
          },
          {
            variant: "Model 3 Long Range",
            type: "Sedan",
            fuel: "Electric",
            price: "₹55 Lakh",
            engine: "Dual Electric Motor",
            power: "394 HP",
            transmission: "Single Speed",
            mileage: "Electric",
            modelPath: "/models/tesla-model-3.glb",
          },
        ],
      },
    },
  };


  /* =====================================================
     SELECTED VARIANT
  ===================================================== */

  if (selectedVariant) {
    return (
      <section className="cars-section" id="cars">

        <button
          className="back-button"
          onClick={() => {
            setSelectedVariant(null);
            setSelectedView("front");
          }}
        >
          ← Back to Variants
        </button>


        {/* =================================================
           VEHICLE DETAIL HEADER
        ================================================= */}

        <div className="vehicle-detail-header">

          <div className="vehicle-detail-left">

            <div className="vehicle-brand-row">

              <img
                src={selectedVariant.logo}
                alt={`${selectedBrand} logo`}
                className="vehicle-brand-logo"
              />

              <div>

                <span className="vehicle-detail-company">
                  {selectedBrand}
                </span>

                <h2>{selectedModel}</h2>

                <h3>
                  {selectedVariant.variant}
                </h3>

                <p>
                  {selectedVariant.type} •{" "}
                  {selectedVariant.fuel}
                </p>

              </div>

            </div>

          </div>


          <div className="vehicle-detail-right">

            <span>
              STARTING PRICE
            </span>

            <strong>
              {selectedVariant.price}
            </strong>

          </div>

        </div>


        {/* =================================================
           GALLERY
        ================================================= */}

        <div className="car-gallery">

          <div className="gallery-main">

            <div className="gallery-preview">

              <span className="gallery-view-label">
                {selectedView.toUpperCase()} VIEW
              </span>

              <div className="gallery-visual">
                3D
              </div>

              <h3>
                {selectedModel}
              </h3>

              <p>

                {selectedView === "front" &&
                  "Explore the front design and exterior details."}

                {selectedView === "side" &&
                  "Explore the side profile, wheels and body design."}

                {selectedView === "rear" &&
                  "Explore the rear design and performance styling."}

                {selectedView === "interior" &&
                  "Explore the interior experience of the vehicle."}

              </p>

            </div>

          </div>


          <div className="gallery-thumbnails">

            <button
              className={
                selectedView === "front"
                  ? "gallery-thumb active"
                  : "gallery-thumb"
              }
              onClick={() =>
                setSelectedView("front")
              }
            >
              <span>01</span>
              Front
            </button>


            <button
              className={
                selectedView === "side"
                  ? "gallery-thumb active"
                  : "gallery-thumb"
              }
              onClick={() =>
                setSelectedView("side")
              }
            >
              <span>02</span>
              Side
            </button>


            <button
              className={
                selectedView === "rear"
                  ? "gallery-thumb active"
                  : "gallery-thumb"
              }
              onClick={() =>
                setSelectedView("rear")
              }
            >
              <span>03</span>
              Rear
            </button>


            <button
              className={
                selectedView === "interior"
                  ? "gallery-thumb active"
                  : "gallery-thumb"
              }
              onClick={() =>
                setSelectedView("interior")
              }
            >
              <span>04</span>
              Interior
            </button>

          </div>

        </div>


        {/* =================================================
           REAL 3D MODEL PATH
        ================================================= */}

        <Car3D
          view={selectedView}
          variant={selectedVariant}
          modelPath={selectedVariant.modelPath}
        />


        {/* =================================================
           VEHICLE ACTION BAR
        ================================================= */}

        <div className="vehicle-action-bar">

          <div className="vehicle-action-info">

            <span>
              READY TO EXPLORE
            </span>

            <strong>
              {selectedModel}{" "}
              {selectedVariant.variant}
            </strong>

          </div>


          <div className="vehicle-action-buttons">

            <button
              className="vehicle-action-button secondary"
              onClick={() => {
                alert(
                  `${selectedModel} ${selectedVariant.variant} added to comparison.`
                );
              }}
            >
              Compare Vehicle
            </button>


            <button
              className="vehicle-action-button primary"
              onClick={() => {
                alert(
                  `${selectedModel} ${selectedVariant.variant} configuration saved.`
                );
              }}
            >
              Save Configuration
            </button>

          </div>

        </div>


        {/* =================================================
           VEHICLE SUMMARY
        ================================================= */}

        <div className="vehicle-summary">

          <div className="vehicle-summary-header">

            <span>
              SELECTED VEHICLE
            </span>

            <h2>
              {selectedBrand} {selectedModel}
            </h2>

            <p>
              {selectedVariant.variant}
            </p>

          </div>


          <div className="vehicle-summary-grid">

            <div className="vehicle-summary-card">
              <span>PRICE</span>
              <strong>
                {selectedVariant.price}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>POWER</span>
              <strong>
                {selectedVariant.power}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>ENGINE</span>
              <strong>
                {selectedVariant.engine}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>FUEL</span>
              <strong>
                {selectedVariant.fuel}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>TRANSMISSION</span>
              <strong>
                {selectedVariant.transmission}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>BODY TYPE</span>
              <strong>
                {selectedVariant.type}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>MILEAGE</span>
              <strong>
                {selectedVariant.mileage}
              </strong>
            </div>


            <div className="vehicle-summary-card">
              <span>3D EXPERIENCE</span>
              <strong>
                Interactive
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
           OVERVIEW
        ================================================= */}

        <div className="car-overview">

          <div className="overview-text">

            <span className="car-company">
              {selectedBrand}
            </span>

            <h2>
              {selectedModel}{" "}
              {selectedVariant.variant}
            </h2>

            <p>
              Explore the design, equipment and
              performance of this vehicle using
              the interactive 3D viewer.
            </p>

          </div>

        </div>


        {/* =================================================
           SPECIFICATIONS
        ================================================= */}

        <div className="car-specifications">

          <h2>
            Vehicle Specifications
          </h2>

          <div className="spec-grid">

            <div>
              <span>Variant</span>
              <strong>
                {selectedVariant.variant}
              </strong>
            </div>

            <div>
              <span>Price</span>
              <strong>
                {selectedVariant.price}
              </strong>
            </div>

            <div>
              <span>Engine</span>
              <strong>
                {selectedVariant.engine}
              </strong>
            </div>

            <div>
              <span>Power</span>
              <strong>
                {selectedVariant.power}
              </strong>
            </div>

            <div>
              <span>Transmission</span>
              <strong>
                {selectedVariant.transmission}
              </strong>
            </div>

            <div>
              <span>Fuel</span>
              <strong>
                {selectedVariant.fuel}
              </strong>
            </div>

            <div>
              <span>Mileage</span>
              <strong>
                {selectedVariant.mileage}
              </strong>
            </div>

            <div>
              <span>Body Type</span>
              <strong>
                {selectedVariant.type}
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
           PERFORMANCE
        ================================================= */}

        <div className="performance-section">

          <h2>
            Performance
          </h2>

          <div className="performance-grid">

            <div className="performance-card">
              <span>Engine</span>
              <strong>
                {selectedVariant.engine}
              </strong>
            </div>

            <div className="performance-card">
              <span>Power</span>
              <strong>
                {selectedVariant.power}
              </strong>
            </div>

            <div className="performance-card">
              <span>Transmission</span>
              <strong>
                {selectedVariant.transmission}
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
           EQUIPMENT
        ================================================= */}

        <div className="equipment-intro">

          <h2>
            Equipment & Features
          </h2>

          <p>
            Click the + markers on the 3D vehicle
            or use the equipment cards to explore
            individual features.
          </p>

        </div>

      </section>
    );
  }


  /* =====================================================
     MODEL SELECTED
  ===================================================== */

  if (selectedModel) {

    const variants =
      companies[selectedCompany].models[selectedModel];

    return (
      <section
        className="cars-section"
        id="cars"
      >

        <button
          className="back-button"
          onClick={() =>
            setSelectedModel(null)
          }
        >
          ← Back to Models
        </button>


        <h2>
          {selectedModel}
        </h2>


        <p className="section-subtitle">
          Select a variant to explore.
        </p>


        <div className="cars-grid">

          {variants.map((variant) => (

            <div
              className="car-card"
              key={variant.variant}
              onClick={() => {

                setSelectedVariant({
                  ...variant,
                  logo:
                    companies[selectedCompany].logo,
                });

                setSelectedView("front");

              }}
            >

              <span className="car-company">
                {selectedBrand}
              </span>


              <h3>
                {variant.variant}
              </h3>


              <p>
                {variant.type} •{" "}
                {variant.fuel}
              </p>


              <strong>
                {variant.price}
              </strong>


              <button
                onClick={(event) => {

                  event.stopPropagation();

                  setSelectedVariant({
                    ...variant,
                    logo:
                      companies[selectedCompany].logo,
                  });

                  setSelectedView("front");

                }}
              >
                Explore Variant →
              </button>

            </div>

          ))}

        </div>

      </section>
    );
  }


  /* =====================================================
     BRAND SELECTED
  ===================================================== */

  if (selectedBrand) {

    const company =
      companies[selectedCompany];

    const models =
      company.models;

    return (
      <section
        className="cars-section"
        id="cars"
      >

        <button
          className="back-button"
          onClick={() =>
            setSelectedBrand(null)
          }
        >
          ← Back to Brands
        </button>


        <div className="vehicle-summary-header">

          <div className="vehicle-brand-row">

            <img
              src={company.logo}
              alt={`${company.brand} logo`}
              className="vehicle-brand-logo"
            />

            <div>

              <span>
                AUTOMOTIVE BRAND
              </span>

              <h2>
                {selectedBrand}
              </h2>

            </div>

          </div>

        </div>


        <p className="section-subtitle">
          Select a model to explore.
        </p>


        <div className="cars-grid">

          {Object.keys(models).map((model) => (

            <div
              className="car-card"
              key={model}
              onClick={() =>
                setSelectedModel(model)
              }
            >

              <span className="car-company">
                {selectedBrand}
              </span>


              <h3>
                {model}
              </h3>


              <p>
                Explore available variants
              </p>


              <button>
                View Variants →
              </button>

            </div>

          ))}

        </div>

      </section>
    );
  }


  /* =====================================================
     COMPANY SELECTED
  ===================================================== */

  if (selectedCompany) {

    const company =
      companies[selectedCompany];

    return (
      <section
        className="cars-section"
        id="cars"
      >

        <button
          className="back-button"
          onClick={() =>
            setSelectedCompany(null)
          }
        >
          ← Back to Companies
        </button>


        <h2>
          {selectedCompany}
        </h2>


        <p className="section-subtitle">
          Select a brand to explore.
        </p>


        <div className="cars-grid">

          <div
            className="car-card"
            onClick={() =>
              setSelectedBrand(company.brand)
            }
          >

            <img
              src={company.logo}
              alt={`${company.brand} logo`}
              className="vehicle-brand-logo"
            />


            <span className="car-company">
              AUTOMOTIVE BRAND
            </span>


            <h3>
              {company.brand}
            </h3>


            <p>
              Explore {company.brand} vehicles
            </p>


            <button>
              View Models →
            </button>

          </div>

        </div>

      </section>
    );
  }


  /* =====================================================
     COMPANY LIST
  ===================================================== */

  return (
    <section
      className="cars-section"
      id="cars"
    >

      <h2>
        Explore Automotive Companies
      </h2>


      <p className="section-subtitle">
        Select a company to explore its
        brands, models and variants.
      </p>


      <div className="cars-grid">

        {Object.keys(companies).map(
          (company) => (

            <div
              className="car-card"
              key={company}
              onClick={() =>
                setSelectedCompany(company)
              }
            >

              <span className="car-company">
                AUTOMOTIVE COMPANY
              </span>


              <h3>
                {company}
              </h3>


              <p>
                Explore brands and vehicles
              </p>


              <button>
                View Brands →
              </button>

            </div>

          )
        )}

      </div>

    </section>
  );
}

export default Cars;