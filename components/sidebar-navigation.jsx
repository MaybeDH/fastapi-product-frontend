"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CheckSquare,
  Package,
  Users,
  Tag,
  Briefcase,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

const navItems = [
  {
    title: "Tareas",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Productos",
    href: "/products",
    icon: Package,
  },
  {
    title: "Clientes",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Categorías",
    href: "/categories",
    icon: Tag,
  },
  {
    title: "Marcas",
    href: "/brands",
    icon: Briefcase,
  },
  {
    title: "Mi Perfil",
    href: "/profile",
    icon: User,
  },
]

export function SidebarNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsAuthenticated(isLoggedIn)

    // Guardar el estado del sidebar en localStorage
    const savedSidebarState = localStorage.getItem("sidebarCollapsed")
    if (savedSidebarState) {
      setIsCollapsed(savedSidebarState === "true")
    }
  }, [])

  // Guardar el estado del sidebar cuando cambia
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed.toString())
  }, [isCollapsed])

  const handleLogout = () => {
    // Simular cierre de sesión
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem("avatar")

    setIsAuthenticated(false)

    // Redirigir a la página de inicio
    router.push("/")
  }

 /*  // Si el usuario no está autenticado, no mostrar el sidebar
  if (!isAuthenticated) {
    return null
  } */

  return (
    <>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 border-r bg-background transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex h-16 items-center border-b px-6 justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <CheckSquare className="h-6 w-6" />
              <span className="text-xl font-bold">Sistema</span>
            </Link>
          )}
          {isCollapsed && <CheckSquare className="h-6 w-6 mx-auto" />}
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsSidebarOpen(false)}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive ? "bg-secondary" : "",
                      isCollapsed ? "justify-center px-2" : "",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-0" : "mr-2")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Botón de cerrar sesión en la parte inferior */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10",
                isCollapsed ? "justify-center px-2" : "",
              )}
              onClick={handleLogout}
            >
              <LogOut className={cn("h-5 w-5", isCollapsed ? "mx-0" : "mr-2")} />
              {!isCollapsed && <span>Cerrar Sesión</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer para empujar el contenido principal */}
      <div
        className={cn(
          "hidden md:block flex-shrink-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
        )}
      />
    </>
  )
}

