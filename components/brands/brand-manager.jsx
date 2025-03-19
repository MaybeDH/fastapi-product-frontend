"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import BrandTable from "./brand-table";
import BrandForm from "./brand-form";
import BrandDetails from "./brand-details";
import DeleteConfirmation from "../ui/delete-confirmation";


export default function BrandManager() {
  const [brands, setBrands] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Simulate fetching brands from an API
  useEffect(() => {
    // Mock brands
    const mockBrands = [
      {
        id: 1,
        name: "TechPro",
        description: "Marca líder en tecnología",
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        name: "FashionStyle",
        description: "Moda contemporánea",
        created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        name: "HomePlus",
        description: "Todo para tu hogar",
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setBrands(mockBrands)
  }, [])

  const handleCreateBrand = (newBrand) => {
    const brand = {
      ...newBrand,
      id: Math.max(0, ...brands.map((b) => b.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setBrands([...brands, brand])
    setIsFormOpen(false)
  }

  const handleUpdateBrand = (updatedBrand) => {
    setBrands(
      brands.map((brand) => (brand.id === updatedBrand.id ? updatedBrand : brand))
    )
    setIsFormOpen(false)
    setIsEditing(false)
  }

  const handleDeleteBrand = () => {
    if (currentBrand) {
      setBrands(brands.filter((brand) => brand.id !== currentBrand.id))
      setIsDeleteOpen(false)
      setCurrentBrand(null)
    }
  }

  const openBrandDetails = (brand) => {
    setCurrentBrand(brand)
    setIsDetailsOpen(true)
  }

  const openEditForm = (brand) => {
    setCurrentBrand(brand)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const openDeleteConfirmation = (brand) => {
    setCurrentBrand(brand)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <Button
          onClick={() => {
            setIsEditing(false)
            setCurrentBrand(null)
            setIsFormOpen(true)
          }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Marca
        </Button>
      </div>
      <BrandTable
        brands={brands}
        onViewBrand={openBrandDetails}
        onEditBrand={openEditForm}
        onDeleteBrand={openDeleteConfirmation} />
      <BrandForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={isEditing ? handleUpdateBrand : handleCreateBrand}
        brand={isEditing ? currentBrand : null}
        isEditing={isEditing} />
      <BrandDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        brand={currentBrand} />
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteBrand}
        taskTitle={currentBrand?.name || ""} />
    </div>
  );
}

