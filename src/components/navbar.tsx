import type { FC } from "react";
import { Navbar } from "flowbite-react";

const ExampleNavbar: FC = function () {
  return (
    // GLASS EFFECT ADDED HERE: bg-white/70 backdrop-blur-md
    <Navbar fluid className="fixed top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          
          {/* BRANDING */}
          <div className="flex items-center">
            <Navbar.Brand href="/">
               <svg 
                  className="mr-3 h-8 w-8 text-indigo-600 dark:text-indigo-400 drop-shadow-sm" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2"
              >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="self-center whitespace-nowrap text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Prism
              </span>
            </Navbar.Brand>
          </div>

        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;