import Link from "next/link";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { ListChecks, TrendingUp, BarChart2, CheckSquare, Package, Users, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Bienvenido, 
          {/* {userName} */} Dayana
          </h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de la actividad de tu sistema de gestión.</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tareas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <CheckSquare className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <Package className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {/* {categories.length} */}
                3
              </div>
              <ListChecks className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Marcas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {/* {brands.length} */}8
                </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accesos rápidos */}
      <h2 className="text-xl font-semibold mt-4">Accesos Rápidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/tasks">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <CheckSquare className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg mb-1">Gestionar Tareas</CardTitle>
              <CardDescription>Administra tus tareas pendientes</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/products">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Package className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg mb-1">Gestionar Productos</CardTitle>
              <CardDescription>Administra tu catálogo de productos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/customers">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg mb-1">Gestionar Clientes</CardTitle>
              <CardDescription>Administra tu base de clientes</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <BarChart2 className="h-8 w-8 mb-2 text-primary" />
              <CardTitle className="text-lg mb-1">Mi Perfil</CardTitle>
              <CardDescription>Administra tu información personal</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Actividad reciente */}
      <h2 className="text-xl font-semibold mt-4">Actividad Reciente</h2>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="flex items-center gap-4 p-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Tarea completada</p>
                <p className="text-sm text-muted-foreground">Completar informe mensual</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">Hace 2 horas</div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Producto añadido</p>
                <p className="text-sm text-muted-foreground">Smartphone XYZ</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">Hace 1 día</div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Cliente añadido</p>
                <p className="text-sm text-muted-foreground">Juan Pérez</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">Hace 3 días</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

    

  );
}
