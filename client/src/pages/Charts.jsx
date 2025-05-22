import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { Line, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Charts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS.BASE);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Product creation error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!products.length) {
    return <div>Loading...</div>; // Affichage pendant le chargement
  }

  const productPrices = products.map((product) => product.price);
  const productNames = products.map((product) => product.name);

  // Graphique Doughnut
  const doughnutData = {
    labels: productNames,
    datasets: [
      {
        label: "Prix des produits (Doughnut Chart)",
        data: productPrices,
        backgroundColor: [
          "rgba(75, 85, 99, 0.6)", // gray-600
          "rgba(239, 68, 68, 0.6)", // red-600
          "rgba(30, 58, 138, 0.6)", // blue-800
          "rgba(75, 192, 192, 0.6)", // Autre couleur
          "rgba(153, 102, 255, 0.6)", // Autre couleur
        ],
        borderColor: [
          "rgba(75, 85, 99, 1)", // gray-600
          "rgba(239, 68, 68, 1)", // red-600
          "rgba(30, 58, 138, 1)", // blue-800
          "rgba(75, 192, 192, 1)", // Autre couleur
          "rgba(153, 102, 255, 1)", // Autre couleur
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Prix des produits (Doughnut Chart)",
      },
    },
  };

  // Graphique linéaire
  const lineData = {
    labels: productNames,
    datasets: [
      {
        label: "Prix des produits",
        data: productPrices,
        borderColor: "rgba(75, 192, 192, 1)", // Autre couleur
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Autre couleur
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Prix des produits",
      },
    },
  };

  // Données pour le graphique en secteurs
  const categories = {};
  products.forEach((product) => {
    categories[product.category] =
      (categories[product.category] || 0) + product.countInStock;
  });

  const categoryLabels = Object.keys(categories);
  const categoryData = Object.values(categories);

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Stock par catégorie",
        data: categoryData,
        backgroundColor: [
          "rgba(75, 85, 99, 0.6)", // gray-600
          "rgba(239, 68, 68, 0.6)", // red-600
          "rgba(30, 58, 138, 0.6)", // blue-800
          "rgba(75, 192, 192, 0.6)", // Autre couleur
          "rgba(153, 102, 255, 0.6)", // Autre couleur
        ],
        borderColor: [
          "rgba(75, 85, 99, 1)", // gray-600
          "rgba(239, 68, 68, 1)", // red-600
          "rgba(30, 58, 138, 1)", // blue-800
          "rgba(75, 192, 192, 1)", // Autre couleur
          "rgba(153, 102, 255, 1)", // Autre couleur
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Répartition du stock par catégorie",
      },
    },
  };

  return (
    <div className="w-full gap-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 h-[500px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />{" "}
          {/* Doughnut Chart */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 h-[500px]">
          <Pie data={pieData} options={pieOptions} /> {/* Pie Chart */}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md h-[500px] mb-4 col-span-2">
        <Line data={lineData} options={lineOptions} /> {/* Line Chart */}
      </div>
    </div>
  );
}

export default Charts;
