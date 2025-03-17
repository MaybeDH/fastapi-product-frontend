"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProductTable from "./product-table";
import ProductForm from "./product-form";
import ProductDetails from "./product-details";
import DeleteConfirmation from "@/components/delete-confirmation";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const mockCategories = [
      { id: 1, name: "Electrónicos", description: "Productos electrónicos y gadgets" },
      { id: 2, name: "Ropa", description: "Prendas de vestir y accesorios" },
      { id: 3, name: "Hogar", description: "Artículos para el hogar" },
    ];

    const mockBrands = [
      { id: 1, name: "TechPro", description: "Marca líder en tecnología" },
      { id: 2, name: "FashionStyle", description: "Moda contemporánea" },
      { id: 3, name: "HomePlus", description: "Todo para tu hogar" },
    ];

    const mockProducts = [
      {
        id: 1,
        title: "Smartphone XYZ",
        price: 8999.99,
        description: "Smartphone de última generación con cámara de alta resolución",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop",
        created_at: new Date().toISOString(),
        category: mockCategories[0],
        brand: mockBrands[0],
      },
      {
        id: 2,
        title: "Camisa Casual",
        price: 599.99,
        description: "Camisa casual de algodón para uso diario",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop",
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: mockCategories[1],
        brand: mockBrands[1],
      },
      {
        id: 3,
        title: "Juego de Sartenes",
        price: 1299.99,
        description: "Juego de 3 sartenes antiadherentes de alta calidad",
        image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1974&auto=format&fit=crop",
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        category: mockCategories[2],
        brand: mockBrands[2],
      },
    ];

    setCategories(mockCategories);
    setBrands(mockBrands);
    setProducts(mockProducts);
  }, []);

  const handleCreateProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      created_at: new Date().toISOString(),
    };
    setProducts([...products, product]);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setIsFormOpen(false);
    setIsEditing(false);
  };

  const handleDeleteProduct = () => {
    if (currentProduct) {
      setProducts(products.filter((product) => product.id !== currentProduct.id));
      setIsDeleteOpen(false);
      setCurrentProduct(null);
    }
  };

  const openProductDetails = (product) => {
    setCurrentProduct(product);
    setIsDetailsOpen(true);
  };

  const openEditForm = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const openDeleteConfirmation = (product) => {
    setCurrentProduct(product);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button
          onClick={() => {
            setIsEditing(false);
            setCurrentProduct(null);
            setIsFormOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <ProductTable
        products={products}
        onViewProduct={openProductDetails}
        onEditProduct={openEditForm}
        onDeleteProduct={openDeleteConfirmation}
      />

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct}
        product={isEditing ? currentProduct : null}
        isEditing={isEditing}
        categories={categories}
        brands={brands}
      />

      <ProductDetails isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} product={currentProduct} />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteProduct}
        taskTitle={currentProduct?.title || ""}
      />
    </div>
  );
}
