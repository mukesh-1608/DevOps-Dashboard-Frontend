import { Sidebar } from "flowbite-react";
import type { FC, PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import ExampleSidebar from "../components/sidebar";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children }) {
    return (
      <>
        {/* Main Background with Mesh Gradient */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
          
          <Navbar />
          
          <div className="flex items-start pt-16">
            <ExampleSidebar />
            
            <main className="relative h-full w-full overflow-y-auto lg:ml-64">
              {children}
            </main>
          </div>
          
        </div>
      </>
    );
  };

export default NavbarSidebarLayout;