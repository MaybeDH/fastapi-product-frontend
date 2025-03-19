"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CategoryTable from "./category-table";
import CategoryForm from "./category-form"
import CategoryDetails from "./category-details"
import DeleteConfirmation from "../ui/delete-confirmation";

export default function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Simulate fetching categories from an API
  useEffect(() => {
    // Mock categories
    const mockCategories = [
      {
        id: 1,
        name: "Electrónicos",
        description: "Productos electrónicos y gadgets",
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        name: "Ropa",
        description: "Prendas de vestir y accesorios",
        created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        name: "Hogar",
        description: "Artículos para el hogar",
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setCategories(mockCategories)
  }, [])

  const handleCreateCategory = (newCategory) => {
    const category = {
      ...newCategory,
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setCategories([...categories, category])
    setIsFormOpen(false)
  }

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map(
      (category) => (category.id === updatedCategory.id ? updatedCategory : category)
    ))
    setIsFormOpen(false)
    setIsEditing(false)
  }

  const handleDeleteCategory = () => {
    if (currentCategory) {
      setCategories(categories.filter((category) => category.id !== currentCategory.id))
      setIsDeleteOpen(false)
      setCurrentCategory(null)
    }
  }

  const openCategoryDetails = (category) => {
    setCurrentCategory(category)
    setIsDetailsOpen(true)
  }

  const openEditForm = (category) => {
    setCurrentCategory(category)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const openDeleteConfirmation = (category) => {
    setCurrentCategory(category)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button
          onClick={() => {
            setIsEditing(false)
            setCurrentCategory(null)
            setIsFormOpen(true)
          }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        onViewCategory={openCategoryDetails}
        onEditCategory={openEditForm}
        onDeleteCategory={openDeleteConfirmation} />
      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={isEditing ? handleUpdateCategory : handleCreateCategory}
        category={isEditing ? currentCategory : null}
        isEditing={isEditing} />
      <CategoryDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        category={currentCategory} />
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteCategory}
        taskTitle={currentCategory?.name || ""} />
    </div>
  );
}

