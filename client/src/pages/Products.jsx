import axios from "axios";
import ProductForm from "../components/ProductForm";
import UpdateForm from "../components/UpdateForm";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import LoadingModal from "../components/LoadingModal"; // Importez le nouveau composant

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setshowForm] = useState(false);
  const [UpdateProduct, setUpdateProduct] = useState(false);
  const [UpdatedProduct, setUpdatedProduct] = useState();
  /* -------------------------------------------------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);
  /* -------------------------------------------------------------------------- */
  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await axios.get("http://localhost:4000/products");
      console.log(products.data);
      setTimeout(() => {
        setLoading(false);
        setProducts(products.data);
      }, 1000);
    } catch (error) {
      console.error("Product creation error:", error);
      setError(error.message);
      setLoading(false); // Assurez-vous de désactiver le chargement en cas d'erreur
    }
  };

  const deleteProduct = async (code) => {
    setLoading(true);
    try {
      const product = await axios.delete(
        `http://localhost:4000/products/delete/${code}`
      );
      console.log(product.data);
      getProducts();
      setCurrentPage(currentPage - 1);
    } catch (error) {
      console.error("Product creation error:", error);
      setError(error.message);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  const deleteAllProducts = async (code) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/products/delete`);
      getProducts();
      setCurrentPage(currentPage - 1);
    } catch (error) {
      console.error("Product creation error:", error);
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full">
      <LoadingModal isOpen={loading} />
      {UpdateProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 ">
          <div className="w-2/3 mx-auto ">
            <UpdateForm
              setUpdateProduct={setUpdateProduct}
              UpdatedProduct={UpdatedProduct}
              getProducts={getProducts}
              // setshowForm={setshowForm}
            ></UpdateForm>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 ">
          <div className="w-2/3 mx-auto">
            <ProductForm
              setshowForm={setshowForm}
              getProducts={getProducts}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
      {/* {!showForm && ( */}
      <div className="w-full ">
        <div className="p-6 flex flex-col">
          <div className="flex justify-end items-center gap-2 py-4">
            <button
              onClick={() => {
                deleteAllProducts();
              }}
              className=" bg-red-600 hover:bg-red-500 text-white px-6 py-1 rounded"
            >
              Supprimer tous
            </button>
            <button
              onClick={() => setshowForm(true)}
              className="bg-gray-950 hover:bg-gray-800 hover:text-white text-gray-100 px-6 py-1 rounded"
            >
              ajouter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {error && (
              <div className=" col-span-full flex text-center justify-center items-center w-full py-8">
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="font-bold">Erreur</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
            {!loading && !error && products.length === 0 && (
              <div className="col-span-full flex text-center justify-center items-center w-full py-8">
                <p className="text-xl text-gray-500">
                  Aucun produit disponible
                </p>
              </div>
            )}
            {!loading &&
              currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                >
                  <img
                    className="w-full h-64 object-cover rounded-t-lg"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-900 mt-2 text-sm">
                      {product.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-700">
                        {product.price} dh
                      </span>
                      <span className="text-sm text-gray-600">
                        {product.countInStock} in stock
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          setUpdateProduct(true);
                          setUpdatedProduct(product);
                        }}
                        className="flex items-center justify-center w-full py-2 px-4 bg-gray-900 text-gray-100 rounded-lg hover:bg-gray-700 focus:outline-none"
                      >
                        <FaEdit className="h-4 w-4 mr-2" />
                      </button>
                      <button
                        onClick={() => {
                          deleteProduct(product.code);
                        }}
                        className="flex items-center justify-center w-full py-2 px-4 bg-gray-900 text-gray-100 rounded-lg hover:bg-gray-700 focus:outline-none"
                      >
                        <FaTrash className="h-4 w-4 mr-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* -------------------------------pagination------------------------------------------- */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-700 text-white"
            } transition-colors duration-200`}
          >
            <FaCaretLeft />
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-700 text-white"
            } transition-colors duration-200`}
          >
            <FaCaretRight />
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Products;
