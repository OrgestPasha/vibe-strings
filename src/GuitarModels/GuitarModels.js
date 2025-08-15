import React, {useState, useRef, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import "./GuitarModels.css";
import {FiFilter, FiChevronDown, FiSearch, FiArrowLeft} from "react-icons/fi";
import "../index.css";
const GET_MODELS_BY_BRAND = gql`
  query GetModelsByBrand($id: ID!) {
    findBrandModels(id: $id, sortBy: {field: name, order: ASC}) {
      id
      name
      type
      image
      price
    }
  }
`;

const GET_BRAND_BY_ID = gql`
  query GetBrandById($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      image
      origin
    }
  }
`;

function GuitarModels() {
  const {brandId} = useParams();
  const navigate = useNavigate();

  const {data, loading, error} = useQuery(GET_MODELS_BY_BRAND, {
    variables: {id: brandId},
  });
  const {data: brandData} = useQuery(GET_BRAND_BY_ID, {
    variables: {id: brandId},
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef(null);

  const options = [
    {value: "ELECTRIC", label: "Electric"},
    {value: "ACOUSTIC", label: "Acoustic"},
    {value: "BASS", label: "Bass"},
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 6);
        }
      },
      {threshold: 1.0}
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  if (loading) return <p>{"LoadingModels"}</p>;
  if (error)
    return (
      <p>
        {"ErrorModels"} {error.message}
      </p>
    );
  if (!brandData) return <p>Loading brand info...</p>;

  const brand = brandData?.findUniqueBrand;

  const filteredModels =
    data?.findBrandModels?.filter((model) => {
      const matchesSearch = model.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType === "" || model.type === filterType;
      return matchesSearch && matchesType;
    }) || [];

  const visibleModels = filteredModels.slice(0, visibleCount);

  return (
    <div className="models-page-container">
      <p onClick={() => navigate("/")} class="back">
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

      <div className="models-hero-wrapper">
        <div className="models-hero-left">
          <h1>
            Play like a <span>Rock star</span>
          </h1>

          <p>
            With a legacy dating back to the 1950s, {brand?.name} blends expert
            craftsmanship with cutting-edge innovation to deliver guitars that
            inspire creativity and elevate your performance. Trusted by top
            artists worldwide, Ibanez guitars are built to play fast, sound
            bold, and stand out on any stage. Ask ChatGPT
          </p>
        </div>

        <div className="models-hero-right">
          <div className="models-hero-image-mask">
            {brand?.image && (
              <img
                src={brand.image}
                alt={`${brand.name} Logo`}
                className="brand-overlay-logo"
              />
            )}
          </div>

          <div className="bottom-logo">
            <div className="logo-shape">
              <div className="half-circle left"></div>
              <div className="half-circle right"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="models-header">
        <h2>
          Check out the <span>Selection</span>
        </h2>
      </div>

      <div className="custom-filter">
        <div ref={dropdownRef} className="filter-dropdown">
          <FiFilter className="filter-icon" />
          <div
            className="selected-text"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            {filterType === ""
              ? "Filter by type"
              : options.find((opt) => opt.value === filterType)?.label}
            <FiChevronDown
              className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}
            />
          </div>

          {dropdownOpen && (
            <ul className="custom-options">
              {options.map((opt) => (
                <li
                  key={opt.value}
                  className={filterType === opt.value ? "active" : ""}
                  onClick={() => {
                    setFilterType(opt.value);
                    setDropdownOpen(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder={"SearchPlaceholder"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div class="grid-container">
        <div className="models-grid">
          {visibleModels.map((model) => (
            <div
              key={model.id}
              className="model-card"
              onClick={() => navigate(`/brands/${brandId}/models/${model.id}`)}
            >
              <img src={model.image} alt={model.name} className="model-image" />
              <h3 className="model-name">{model.name}</h3>
              <p class="model-price">${model.price}</p>
            </div>
          ))}
        </div>
      </div>

      {visibleCount < filteredModels.length && (
        <div ref={loadMoreRef} className="load-more-trigger"></div>
      )}
    </div>
  );
}

export default GuitarModels;
