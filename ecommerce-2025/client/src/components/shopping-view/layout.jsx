import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-[#FFFFFF] overflow-hidden min-h-screen">
      {/* common header */}
      <ShoppingHeader />
      
      {/* Main content area */}
      <main className="flex flex-col w-full flex-grow bg-[#FFFFFF]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-green-200 text-black py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>VAIBHAVI COLLECTION 2025 &copy; . All rights reserved.</p>
          
          <div className="mt-2">
            <a href="/privacy" className="text-gray-400 hover:text-black mx-2">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-black mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShoppingLayout;
