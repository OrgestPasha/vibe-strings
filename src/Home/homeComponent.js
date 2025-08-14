import React from "react";
import styles from "./home.css";

function HomeComponent() {
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
    </div>
  );
}

export default HomeComponent;
