import TaskManager from "@/components/task/task-manager";
export default async function TasksPage() {
/*   const resp = await fetch("http://localhost:8000/tasks/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  
    const data = await resp.json(); */
  
    //console.log({ resp, data });
  
  
    return (
      // <main className="container mx-auto py-10 px-4">
      //   <h1 className="text-3xl font-bold mb-8 text-center">Administrador de Tareas</h1>
      //   <TaskManager
      //  /*    allTasks={data} */
      //   />
        
      // </main>
       <div className="container mx-auto p-4 md:p-6 lg:p-8 overflow-x-auto">
       <TaskManager />
     </div>
    );
}