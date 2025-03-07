export default async function Home() {

  const resp = await fetch("http://localhost:8000/tasks/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const data = await resp.json();

  console.log({ resp,data });

  return (
    <div>
      hola mundo
    </div>
  );
}
