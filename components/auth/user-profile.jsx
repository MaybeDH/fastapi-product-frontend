"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
//import EditProfileForm from "./edit-profile-form";

export function UserProfile() {
  const [user, setUser] = useState({
    username: "",
    email: "usuario@ejemplo.com",
    first_name: "",
    last_name: "",
    created_at: "2023-01-15T10:30:00Z",
    avatar: "",
    tasks_completed: 12,
    tasks_pending: 5,
    bio: "",
  });
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // Redirect to login page if no token
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/auth/users/me/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        console.log("User data:", userData);

        setUser((prev) => ({
          ...prev,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally redirect to login or show an error message
        router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleSaveProfile = (updatedUser) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }));
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                />
                <AvatarFallback className="text-lg">
                  {getInitials(user.first_name, user.last_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {user.first_name} {user.last_name}
                </CardTitle>
                <CardDescription className="text-base">
                  @{user.username}
                </CardDescription>
              </div>
            </div>
            {/* <Button onClick={() => setIsEditFormOpen(true)}>Editar perfil</Button> */}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-6 pt-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Nombre completo</p>
                    <p>
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Correo electrónico</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Miembro desde</p>
                    <p>{formatDate(user.created_at)}</p>
                  </div>
                </div>
                {user.bio && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Biografía</p>
                    <p className="mt-1 text-muted-foreground">{user.bio}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="stats" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Tareas completadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {user.tasks_completed}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tareas pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {user.tasks_pending}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* <EditProfileForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSave={handleSaveProfile}
        user={user}
      /> */}
    </div>
  );
}
