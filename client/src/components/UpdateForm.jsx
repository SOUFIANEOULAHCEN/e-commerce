import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

function UpdateForm({ UpdatedProduct, setUpdateProduct ,  getProducts }) {
  console.log(setUpdateProduct);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error: showErrorToast, success: showSuccessToast } = useToast();
  const [formData, setFormData] = useState({
    name: UpdatedProduct.name || "",
    description: UpdatedProduct.description || "",
    price: UpdatedProduct.price || "",
    category: UpdatedProduct.category || "",
    countInStock: UpdatedProduct.countInStock || "",
    code: UpdatedProduct.code || "",
    imageUrl: UpdatedProduct.imageUrl || "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      await axios.put(
        `http://localhost:4000/products/edit/${UpdatedProduct.code}`,
        formData
      );
      showSuccessToast("Produit modifié avec succès !");
      
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
    //   setCurrentPage(totalPages);
      setTimeout(() => {
        setUpdateProduct(false);
      }, 1000);
      
    } catch (err) {
      showErrorToast("Erreur lors de la modification du produit. Vérifiez les champs.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full md:w-4/5 mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Modifier un Produit
        </h2>
        <button
          onClick={() => setUpdateProduct(false)}
          className="text-gray-950 mb-3 text-2xl font-semibold px-2 hover:text-gray-700"
        >
          X
        </button>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div>
              <label className="block text-gray-900 font-semibold">
                Nom du produit
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-900 font-semibold">
                Prix (DH)
              </label>
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
          </div>
          <div>
            <div>
              <label className="block text-gray-900 font-semibold">
                Catégorie
              </label>
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
              <label className="block text-gray-900 font-semibold">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          disabled={loading}
        >
          {loading ? "Modification en cours..." : "Modifier le produit"}
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
