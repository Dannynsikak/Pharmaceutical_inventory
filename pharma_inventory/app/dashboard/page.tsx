import StockComponent from "../components/PharmaInventory";
import Procurement from "../components/Procurement";
import Distribution from "../components/Distribution";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Pharmaceutical Inventory Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <StockComponent />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Procurement />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Distribution />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
