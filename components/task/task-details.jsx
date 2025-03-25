"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function TaskDetails({
  isOpen,
  onClose,
  task
}) {
  if (!task) return null

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy, HH:mm:ss", { locale: es });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles de la Tarea</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <Badge variant={task.completed ? "success" : "default"} className="mt-2">
              {task.completed ? "Completada" : "Pendiente"}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Descripción</h4>
            <p className="text-sm">{task.description || "Sin descripción"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-muted-foreground">ID</h4>
              <p>{task.id}</p>
            </div>

            <div>
              <h4 className="font-medium text-muted-foreground">Estado</h4>
              <p>{task.completed ? "Completada" : "Pendiente"}</p>
            </div>

            <div>
              <h4 className="font-medium text-muted-foreground">Fecha de creación</h4>
              <p>{formatDate(task.created_at)}</p>
            </div>

            <div>
              <h4 className="font-medium text-muted-foreground">Última actualización</h4>
              <p>{formatDate(task.updated_at)}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

