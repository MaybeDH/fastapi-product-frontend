"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CustomerTable from "./customer-table";
import CustomerForm from "./customer-form"
import CustomerDetails from "./customer-dateils";
import DeleteConfirmation from "../ui/delete-confirmation";
export default function CustomerManager() {
  const [customers, setCustomers] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Simulate fetching customers from an API
  useEffect(() => {
    // Mock customers
    const mockCustomers = [
      {
        id: 1,
        name: "Juan",
        last_name: "Pérez",
        description: "Cliente frecuente de productos electrónicos",
        email: "juan.perez@ejemplo.com",
        age: 35,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        name: "María",
        last_name: "González",
        description: "Prefiere productos de hogar",
        email: "maria.gonzalez@ejemplo.com",
        age: 42,
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        name: "Carlos",
        last_name: "Rodríguez",
        description: "Cliente nuevo, interesado en ropa",
        email: "carlos.rodriguez@ejemplo.com",
        age: 28,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setCustomers(mockCustomers)
  }, [])

  const handleCreateCustomer = (newCustomer) => {
    const customer = {
      ...newCustomer,
      id: Math.max(0, ...customers.map((c) => c.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setCustomers([...customers, customer])
    setIsFormOpen(false)
  }

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(
      (customer) => (customer.id === updatedCustomer.id ? updatedCustomer : customer)
    ))
    setIsFormOpen(false)
    setIsEditing(false)
  }

  const handleDeleteCustomer = () => {
    if (currentCustomer) {
      setCustomers(customers.filter((customer) => customer.id !== currentCustomer.id))
      setIsDeleteOpen(false)
      setCurrentCustomer(null)
    }
  }

  const openCustomerDetails = (customer) => {
    setCurrentCustomer(customer)
    setIsDetailsOpen(true)
  }

  const openEditForm = (customer) => {
    setCurrentCustomer(customer)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const openDeleteConfirmation = (customer) => {
    setCurrentCustomer(customer)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button
          onClick={() => {
            setIsEditing(false)
            setCurrentCustomer(null)
            setIsFormOpen(true)
          }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>
      <CustomerTable
        customers={customers}
        onViewCustomer={openCustomerDetails}
        onEditCustomer={openEditForm}
        onDeleteCustomer={openDeleteConfirmation} />
      <CustomerForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={isEditing ? handleUpdateCustomer : handleCreateCustomer}
        customer={isEditing ? currentCustomer : null}
        isEditing={isEditing} />
      <CustomerDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        customer={currentCustomer} />
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteCustomer}
        taskTitle={currentCustomer ? `${currentCustomer.name} ${currentCustomer.last_name}` : ""} />
    </div>
  );
}

