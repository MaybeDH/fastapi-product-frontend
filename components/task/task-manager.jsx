"use client";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TaskTable from "./task-table";
import TaskForm from "./task-form";
import DeleteConfirmation from "../ui/delete-confirmation";
import TaskDetails from "./task-details";
export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Simulate fetching tasks from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const mockTasks = [
      {
        id: 1,
        title: "Completar informe mensual",
        description: "Finalizar el informe de ventas para la reunión del lunes",
        completed: false,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Preparar presentación",
        description: "Crear diapositivas para la presentación del nuevo producto",
        completed: true,
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        title: "Revisar presupuesto",
        description: "Analizar gastos del trimestre y ajustar proyecciones",
        completed: false,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
    setTasks(mockTasks)
  }, [])

  const handleCreateTask = (newTask) => {
    const task = {
      ...newTask,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setTasks([...tasks, task])
    setIsFormOpen(false)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? { ...updatedTask, updated_at: new Date().toISOString() } : task))
    setIsFormOpen(false)
    setIsEditing(false)
  }

  const handleDeleteTask = () => {
    if (currentTask) {
      setTasks(tasks.filter((task) => task.id !== currentTask.id))
      setIsDeleteOpen(false)
      setCurrentTask(null)
    }
  }

  const openTaskDetails = (task) => {
    setCurrentTask(task)
    setIsDetailsOpen(true)
  }

  const openEditForm = (task) => {
    setCurrentTask(task)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const openDeleteConfirmation = (task) => {
    setCurrentTask(task)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsEditing(false)
            setCurrentTask(null)
            setIsFormOpen(true)
          }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>
      <TaskTable
        tasks={tasks}
        onViewTask={openTaskDetails}
        onEditTask={openEditForm}
        onDeleteTask={openDeleteConfirmation} />
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={isEditing ? handleUpdateTask : handleCreateTask}
        task={isEditing ? currentTask : null}
        isEditing={isEditing} />
      <TaskDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={currentTask} />
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteTask}
        taskTitle={currentTask?.title || ""} />
    </div>
  );
}

