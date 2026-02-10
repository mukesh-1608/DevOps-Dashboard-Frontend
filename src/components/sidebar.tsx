import { Sidebar, DarkThemeToggle } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import {
  HiChartPie,
  HiCloud,
  HiTerminal,
  HiCog,
  HiServer,
  HiViewBoards,
} from "react-icons/hi";

const ExampleSidebar: FC = function () {
  const [isHovered, setIsHovered] = useState(false);

  const sidebarTransition = "transition-all duration-300 ease-in-out";
  const handleNav = (hash: string) => { window.location.hash = hash; };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed left-0 top-0 z-20 h-full pt-16 ${sidebarTransition} ${
        isHovered ? "w-64" : "w-20"
      }`}
    >
      {/* GLASS EFFECT ADDED HERE: bg-white/80 backdrop-blur-xl */}
      <Sidebar
        aria-label="Sidebar"
        collapsed={!isHovered}
        className={`h-full border-r border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80 ${sidebarTransition}`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie} onClick={() => handleNav("")} className="hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-gray-700/50">Dashboard</Sidebar.Item>
            <Sidebar.Item href="#deployments" icon={HiCloud} onClick={() => handleNav("deployments")} className="hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-gray-700/50">Deployments</Sidebar.Item>
            <Sidebar.Item href="#infrastructure" icon={HiServer} onClick={() => handleNav("infrastructure")} className="hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-gray-700/50">Infrastructure</Sidebar.Item>
            <Sidebar.Item href="#logs" icon={HiTerminal} onClick={() => handleNav("logs")} className="hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-gray-700/50">Server Logs</Sidebar.Item>
             <Sidebar.Item href="#kanban" icon={HiViewBoards} onClick={() => handleNav("kanban")} className="hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-gray-700/50">Kanban Board</Sidebar.Item>
            <Sidebar.Item href="#settings" icon={HiCog} onClick={() => handleNav("settings")} className="hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-gray-700/50">Settings</Sidebar.Item>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <div className="flex items-center justify-center pt-2">
                <DarkThemeToggle className="border-2 border-gray-100 dark:border-gray-600 rounded-full focus:ring-indigo-500" />
                <span className={`ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${isHovered ? 'block' : 'hidden'}`}>Theme</span>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default ExampleSidebar;