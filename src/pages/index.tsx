/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";

// Import Custom Components
import DeploymentWizard from "../components/deployment-wizard";
import DeploymentHistory from "../components/deployment-history";
import InfrastructureView from "../components/infrastructure-view";
import ServerLogs from "../components/server-logs";
import KanbanBoard from "../components/kanban-board";
import LoadingSkeleton from "../components/loading-skeleton";
import CommandPalette from "../components/command-palette";

// --- HELPER COMPONENT: GLASS CARD ---
// This is where the magic happens for the cards
const HoverCard: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div
    className={`
        transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl 
        rounded-xl 
        bg-white/60 backdrop-blur-lg border border-white/40 
        p-4 shadow-lg 
        dark:bg-gray-800/60 dark:border-gray-700/40 
        sm:p-6 xl:p-8 
        ${className}
    `}
  >
    {children}
  </div>
);

const Datepicker: FC = function () {
  return (
    <span className="text-sm text-gray-600">
      <Dropdown inline label="Last 7 days">
        <Dropdown.Item><strong>Sep 16 - Sep 22</strong></Dropdown.Item>
        <Dropdown.Divider /><Dropdown.Item>Yesterday</Dropdown.Item><Dropdown.Item>Today</Dropdown.Item><Dropdown.Item>Last 7 days</Dropdown.Item>
      </Dropdown>
    </span>
  );
};

const FooterLink: FC<{ label: string; href?: string }> = ({ label, href = "#" }) => (
  <div className="flex items-center justify-between border-t border-gray-200/50 pt-3 dark:border-gray-700/50 sm:pt-6">
    <Datepicker />
    <div className="shrink-0">
      <a href={href} className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-gray-700 sm:text-sm">
        {label} <svg className="ml-1 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </a>
    </div>
  </div>
);

// --- MAIN PAGE ---

const DashboardPage: FC = function () {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { document.title = "Prism - DevOps Automation"; }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setIsLoading(true);
      const hash = window.location.hash.replace("#", "");
      setCurrentView(hash === "" ? "dashboard" : hash);
      setTimeout(() => setIsLoading(false), 800);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <CommandPalette />
      <NavbarSidebarLayout>
        <div className="px-4 pt-6">
          
          {isLoading ? (
              <LoadingSkeleton />
          ) : (
              <div className="animate-fade-in space-y-6">
                  {currentView === "dashboard" && (
                    <>
                      <div className="transform transition-all duration-300 hover:scale-[1.005]">
                        <DeploymentWizard />
                      </div>
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                          <DeploymentOverview />
                          <ResourceUsage />
                      </div>
                      <BuildLogs />
                      <ClusterHealth />
                    </>
                  )}
                  {currentView === "deployments" && ( <> <DeploymentHistory /> <BuildLogs /> </> )}
                  {currentView === "infrastructure" && ( <InfrastructureView /> )}
                  {currentView === "logs" && ( <ServerLogs /> )}
                  {currentView === "kanban" && ( <KanbanBoard /> )}
                  {currentView === "settings" && (
                      <div className="flex items-center justify-center h-96 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
                          <div className="text-center">
                              <h3 className="text-xl font-bold mb-2">Settings Panel</h3>
                              <p>User management and API keys configuration coming soon.</p>
                          </div>
                      </div>
                  )}
              </div>
          )}
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

// --- WIDGET COMPONENTS ---

const DeploymentOverview: FC = function () {
  return (
    <HoverCard>
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0"><span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">142</span><h3 className="text-base font-normal text-gray-600 dark:text-gray-400">Weekly Deployments</h3></div>
        <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">98.5% Success</div>
      </div>
      <DeploymentChart />
      <FooterLink label="Full Deployment Report" href="#deployments" />
    </HoverCard>
  );
};

const DeploymentChart: FC = function () {
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const borderColor = isDarkTheme ? "#374151" : "#F3F4F600"; // Transparent grid lines for cleaner look
  const options: ApexCharts.ApexOptions = {
    chart: { type: "area", fontFamily: "Inter, sans-serif", toolbar: { show: false }, background: "transparent" },
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.0, stops: [0, 90, 100] } }, // Better gradient fade
    dataLabels: { enabled: false },
    grid: { show: true, borderColor: borderColor, strokeDashArray: 3 },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], labels: { style: { colors: labelColor } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    theme: { mode: isDarkTheme ? 'dark' : 'light' }
  };
  const series = [{ name: "Deployments", data: [15, 22, 18, 30, 25, 10, 5], color: "#4F46E5" }];
  return <Chart height={300} options={options} series={series} type="area" />;
};

const ClusterHealth: FC = function () {
  return (
    <HoverCard>
      <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Cluster Node Health</h3><a href="#infrastructure" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500">View all nodes</a></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NodeStatus name="api-gateway-v1" zone="us-east-1a" status="Healthy" color="green" />
          <NodeStatus name="postgres-primary" zone="us-east-1b" status="Healthy" color="green" />
          <NodeStatus name="redis-cache-01" zone="us-east-1a" status="Latency" color="yellow" />
          <NodeStatus name="worker-node-04" zone="us-east-1c" status="Offline" color="red" />
      </div>
      <FooterLink label="System Health Report" href="#infrastructure" />
    </HoverCard>
  );
};

const NodeStatus = ({ name, zone, status, color }: any) => {
    const bgColors: any = { green: "bg-green-100 text-green-800", yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-800" };
    const dotColors: any = { green: "bg-green-500", yellow: "bg-yellow-400", red: "bg-red-500" };
    return (
        <div className="flex items-center space-x-4 rounded-lg border border-gray-100/50 p-3 hover:bg-white/50 dark:border-gray-700/50 dark:hover:bg-gray-700/50 transition-colors">
            <div className={`h-3 w-3 rounded-full ${dotColors[color]} shadow-sm`}></div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-gray-900 dark:text-white">{name}</p><p className="truncate text-xs text-gray-500 dark:text-gray-400">{zone}</p></div>
            <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${bgColors[color]}`}>{status}</span>
        </div>
    )
}

const ResourceUsage: FC = function () {
  return (
    <HoverCard>
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">System Resource Usage</h3>
      <div className="space-y-6">
        <ResourceBar label="CPU Load (Core)" percentage={75} color="purple" />
        <ResourceBar label="Memory (RAM)" percentage={45} color="blue" />
        <ResourceBar label="Storage (S3)" percentage={20} color="green" />
        <ResourceBar label="Network I/O" percentage={90} color="red" />
      </div>
      <div className="mt-6"><FooterLink label="Detailed Resource Monitor" href="#infrastructure" /></div>
    </HoverCard>
  );
};

const ResourceBar = ({ label, percentage, color }: any) => {
    const colors: any = { purple: "bg-purple-600", blue: "bg-blue-600", green: "bg-green-500", red: "bg-red-500" };
    return (
        <div>
            <div className="mb-1 flex justify-between"><span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span><span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span></div>
            <div className="h-2.5 w-full rounded-full bg-gray-200/50 dark:bg-gray-700/50"><div className={`h-2.5 rounded-full ${colors[color]} shadow-sm`} style={{ width: `${percentage}%` }}></div></div>
        </div>
    )
}

const BuildLogs: FC = function () {
  return (
    <HoverCard>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Pipeline Logs</h3>
        <Badge color="gray" icon={() => <div className="mr-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>}>Live Stream</Badge>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable className="bg-transparent">
          <Table.Head>
            <Table.HeadCell className="bg-gray-50/50 dark:bg-gray-700/50">Commit</Table.HeadCell>
            <Table.HeadCell className="bg-gray-50/50 dark:bg-gray-700/50">Message</Table.HeadCell>
            <Table.HeadCell className="bg-gray-50/50 dark:bg-gray-700/50">Triggered By</Table.HeadCell>
            <Table.HeadCell className="bg-gray-50/50 dark:bg-gray-700/50">Duration</Table.HeadCell>
            <Table.HeadCell className="bg-gray-50/50 dark:bg-gray-700/50">Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-100/50 dark:divide-gray-700/50">
            <Table.Row className="bg-transparent dark:border-gray-700 dark:bg-transparent"><Table.Cell className="font-mono text-xs">#a1b2c3</Table.Cell><Table.Cell className="font-medium text-gray-900 dark:text-white">Update deployment script</Table.Cell><Table.Cell>Mukesh T.</Table.Cell><Table.Cell>2m 14s</Table.Cell><Table.Cell><Badge color="success">Success</Badge></Table.Cell></Table.Row>
            <Table.Row className="bg-transparent dark:border-gray-700 dark:bg-transparent"><Table.Cell className="font-mono text-xs">#d4e5f6</Table.Cell><Table.Cell className="font-medium text-gray-900 dark:text-white">Fix typo in Wizard</Table.Cell><Table.Cell>System</Table.Cell><Table.Cell>1m 45s</Table.Cell><Table.Cell><Badge color="success">Success</Badge></Table.Cell></Table.Row>
             <Table.Row className="bg-transparent dark:border-gray-700 dark:bg-transparent"><Table.Cell className="font-mono text-xs">#987654</Table.Cell><Table.Cell className="font-medium text-gray-900 dark:text-white">Refactor Sidebar logic</Table.Cell><Table.Cell>Admin</Table.Cell><Table.Cell>0m 12s</Table.Cell><Table.Cell><Badge color="failure">Failed</Badge></Table.Cell></Table.Row>
          </Table.Body>
        </Table>
      </div>
      <FooterLink label="View All Server Logs" href="#logs" />
    </HoverCard>
  );
};

export default DashboardPage;