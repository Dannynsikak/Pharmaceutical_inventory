import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-600">
          Welcome to your pharmaceutical inventory system.
        </p>
      </div>
    </>
  );
}
