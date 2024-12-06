import React, { useEffect, useState } from "react";
import "../css/SidebarPaises.css"; 

const SidebarPaises = () => {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const data = await response.json();

        
        const filteredCountries = data
          .filter((country) => paisesG20.includes(country.name.common))
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        setPaises(filteredCountries);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaises();
  }, []);

  if (loading) {
    return (
      <div className="sidebar">
        <h2>Países do G20</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar">
        <h2>Países do G20</h2>
        <p>Erro ao carregar os países: {error}</p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h2>Países do G20</h2>
      <ul>
        {paises.map((country) => (
          <li key={country.cca3 || country.name.common}>
            {country.name.common || "Desconhecido"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarPaises;
