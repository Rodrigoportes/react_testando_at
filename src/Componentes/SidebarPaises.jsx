import React, { useEffect, useState } from "react";
import '../css/SidebarPaises.css'

const SidebarPaises = () => {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);

  const paisesG20 = [
    "South Africa",
    "Germany",
    "Saudi Arabia",
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "South Korea",
    "United States",
    "France",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Mexico",
    "United Kingdom",
    "Russia",
    "Turkey",
  ];

  useEffect(() => {
    const fetchPaises = async () => {
      const cachedData = localStorage.getItem("g20Countries");
      if (cachedData) {
        setPaises(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const filteredCountries = data
          .filter((country) => paisesG20.includes(country.name.common))
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        setPaises(filteredCountries);
        localStorage.setItem("g20Countries", JSON.stringify(filteredCountries));
      } catch (error) {
        console.error("Erro ao buscar os países:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaises();
  }, []);

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Países do G20</h2>
      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <ul className="countries-list">
          {paises.map((country) => (
            <li key={country.cca3} className="country-item">{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarPaises;

