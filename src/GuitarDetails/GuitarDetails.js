import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import "./GuitarDetails.css";
import {gql} from "@apollo/client";

const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      description
      type
      price
      image
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

function GuitarDetails() {
  const {brandId, modelId} = useParams();
  const navigate = useNavigate();

  const {data, loading, error} = useQuery(GET_MODEL_DETAILS, {
    variables: {brandId, modelId},
  });

  const [activeTab, setActiveTab] = useState("specs");
  const [visibleMusicians, setVisibleMusicians] = useState(2);

  if (loading) return <p>{"LoadingDetails"}</p>;
  if (error)
    return (
      <p>
        {"ErrorDetails"} {error.message}
      </p>
    );

  const model = data.findUniqueModel;

  return (
    <div className="details-page-container">
      <p onClick={() => navigate(-1)} class="back">
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.89821 1.6113V0.727235C6.89821 0.650608 6.79294 0.608292 6.72185 0.655183L0.558565 4.6821C0.506199 4.71617 0.463827 4.75979 0.434679 4.80964C0.405532 4.85949 0.390381 4.91425 0.390381 4.96974C0.390381 5.02523 0.405532 5.07999 0.434679 5.12984C0.463827 5.17969 0.506199 5.22331 0.558565 5.25738L6.72185 9.2843C6.79431 9.33119 6.89821 9.28887 6.89821 9.21224V8.32817C6.89821 8.27213 6.86677 8.21838 6.81482 8.18407L1.89294 4.97031L6.81482 1.75541C6.86677 1.7211 6.89821 1.66735 6.89821 1.6113Z"
            fill="#9292A3"
          />
        </svg>
        Back To Home
      </p>

      <div className="logo-fixed">
        <div className="logo-wrapper">
          <div className="logo-shape">
            <div className="half-circle left"></div>
            <div className="half-circle right"></div>
          </div>
          <span className="logo-text">VibeStrings</span>
        </div>
      </div>

      <div className="details-hero-wrapper">
        <div className="details-hero-left">
          <h1>{model.name}</h1>
        </div>
        <div className="details-hero-right">
          <div className="details-hero-image-mask">
            <img
              src={model.image}
              alt={model.name}
              className="model-overlay-image"
            />
          </div>
          <div className="bottom-logo">
            <div className="logo-shape">
              <div className="half-circle left"></div>
              <div className="half-circle right"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-tabs">
        <button
          onClick={() => setActiveTab("specs")}
          className={activeTab === "specs" ? "active-tab" : ""}
        >
          {"Specifictions"}
        </button>
        <button
          onClick={() => setActiveTab("musicians")}
          className={activeTab === "musicians" ? "active-tab" : ""}
        >
          {"Who plays it?"}
        </button>
      </div>

      {activeTab === "specs" && (
        <div className="specs-section">
          {model.description && (
            <p className="model-description">{model.description}</p>
          )}
          <ul>
            <li>
              <p>Body Wood: "{model.specs.bodyWood}"</p>
            </li>
            <li>
              <p>Neck Wood: "{model.specs.neckWood}"</p>
            </li>
            <li>
              <p>Fingerboard: "{model.specs.fingerboardWood}"</p>
            </li>
            <li>
              <p>Pickups: "{model.specs.pickups}"</p>
            </li>
            <li>
              <p>Tuners: "{model.specs.tuners}"</p>
            </li>
            <li>
              <p>Scale Length: "{model.specs.scaleLength}"</p>
            </li>
            <li>
              <p>Bridge: "{model.specs.bridge}"</p>
            </li>
          </ul>
        </div>
      )}

      {activeTab === "musicians" && (
        <div className="musicians-section">
          {model.musicians.slice(0, visibleMusicians).map((m, i) => (
            <div key={i} className="musician-card">
              <img
                src={m.musicianImage}
                alt={m.name}
                className="musician-image"
              />
              <p>
                <strong>{m.name}</strong>
              </p>
            </div>
          ))}
          {visibleMusicians < model.musicians.length && (
            <button
              onClick={() => setVisibleMusicians((prev) => prev + 2)}
              className="show-more-button"
            >
              {"ShowMore" || "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GuitarDetails;
