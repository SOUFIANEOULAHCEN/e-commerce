import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductForm({ setShowFrom, getProducts }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    imageUrl: "",
    code: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("http://localhost:4000/products/create", formData);
      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
        imageUrl: "",
        code: "",
      });

      if (getProducts) {
        getProducts();
      }

      setTimeout(() => {
        setShowFrom(false);
      }, 1000);
    } catch (err) {
      setError("Erreur lors de l'ajout du produit. Vérifiez les champs.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full md:w-4/5 mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Ajouter un Produit
      </h2>

      {success && (
        <p className="text-green-600 text-xl bg-green-400 text-center px-6 py-2 w-full mb-4">
          Produit ajouté avec succès !
        </p>
      )}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block text-gray-900 font-semibold">
            Nom du produit
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-900 font-semibold">Prix (DH)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold">Catégorie</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold">
            Stock disponible
          </label>
          <input
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold">
            Code Produit
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          disabled={loading}
        >
          {loading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
      <button
        type="button"
        className="w-full bg-gray-900 my-3 text-white py-2 rounded-lg hover:bg-gray-700 transition"
      onClick={() => setShowFrom(false)}
      >
        Annuler
      </button>
    </div>
  );
}
