import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen w-full">
        <Navbar/>
        <Outlet/>

      </main>
      <div className="p-10 text-center text-gray-50 bg-gray-800 mt-10">
        Made by group 39
      </div>
    </div>
  )
}
export default AppLayout;
