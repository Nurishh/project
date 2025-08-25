export function Home() {
  // В любом компоненте
  console.log("API URL:", import.meta.env.VITE_API_URL);
  return <p>Home</p>;
}
