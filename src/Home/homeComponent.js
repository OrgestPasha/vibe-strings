import React from "react";
import styles from "./home.css";
import {gql, useQuery} from "@apollo/client";
const GET_BRANDS = gql`
  query getBrands {
    findAllBrands {
      id
      image
    }
  }
`;

function HomeComponent() {

    const {loading, error, data} = useQuery(GET_BRANDS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  return (
    <div class="everything">
      <div class="headerContainer">
        <div class="headerLeft">
          <img src="././logo.png" class="logo" alt="VIBE-STRINGS"></img>
          <div class="text-container">
            <h1>
              Browse top quality <span class="colorText">Guitars</span> online
            </h1>
            <p>
              Explore 50k+ latest collections of branded guitars online with
              VibeStrings.
            </p>
          </div>
        </div>
        <div class="headerRight">
          <img
            src="././headerDashboard.png"
            class="headerDashboard"
            alt="VIBE-STRINGS"
          ></img>
        </div>
      </div>

      <div class="brand-container">
        <h2>Featuring the Best <span class='colorText'>Best Brands</span></h2>
        <p>Select your preferred brand and explore our exquisite collection.</p>
        <div class="brandList">
          {data.findAllBrands.map((brand) => (
            <img
              key={brand.id}
              src={brand.image}
              alt={`Brand ${brand.id}`}
              className="brandImage"
            />
          ))}
        </div>
      </div>

      <div class='features-container'>
          <div class='features-header'>
            <h2>Why try <span class='colorText'>VibeStrings?</span></h2>
            <div class='features'>
              <div class='feature'>
                <img src="././f1.png" alt="Feature 1" />
                <h3>Smooth Browsing</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              <div class='feature'>
                <img src="././f2.png" alt="Feature 1" />
                <h3>EASY Delivery </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

               <div class='feature'>
                <img src="././f3.png" alt="Feature 1" />
                <h3>SwiFT PAYMENTS</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              
            </div>
          </div>
      </div>

      <div class='apps-container'>
        <div class='app-left'>
          <h1>Browse and buy your <span class='colorText'>favorite guitars </span>with VibeStrings. </h1>
          <div class='app-images'>
             <img src="././appStore.png" alt="App Image" class='app-image'></img>
          <img src="././playStore.png" alt="App Image" class='app-image'></img>
          </div>
          </div>
        <div class='app-right'>
          <img src="././appRight.png" alt="App Image" class='app-image'></img>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
