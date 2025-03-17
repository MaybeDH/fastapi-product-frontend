import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckSquare, Package, Users, ArrowRight } from "lucide-react"
export default function Home() {

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Home</h1>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-10 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Sistema de Gestión Empresarial</h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Una plataforma completa para administrar tareas, productos, clientes y más. Todo lo que necesita para su
          negocio en un solo lugar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <CheckSquare className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Gestión de Tareas</h2>
            <p className="text-muted-foreground">
              Organice y haga seguimiento de todas sus tareas y actividades pendientes.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <Package className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Catálogo de Productos</h2>
            <p className="text-muted-foreground">Administre su inventario, categorías y marcas de productos.</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Gestión de Clientes</h2>
            <p className="text-muted-foreground">Mantenga un registro detallado de todos sus clientes.</p>
          </div>
        </div>

        <div className="mt-12">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/login">
              Comenzar <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </main>
  );
}
