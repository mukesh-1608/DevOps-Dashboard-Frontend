import { Button, Card, Label, Select, TextInput, ToggleSwitch, Spinner, Toast } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { createPortal } from "react-dom"; // Import Portal to lock Toast to screen
import { HiCheck } from "react-icons/hi";

const DeploymentWizard: FC = function () {
  // Toggle States
  const [sslEnabled, setSslEnabled] = useState(true);
  const [route53Enabled, setRoute53Enabled] = useState(true);
  const [s3UploadEnabled, setS3UploadEnabled] = useState(true);
  const [iacBranchEnabled, setIacBranchEnabled] = useState(true);

  // Animation States
  const [isDeploying, setIsDeploying] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // The "Fake" Deployment Logic
  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    setIsDeploying(true); // Start Spinner

    // 1. Simulate Delay (3 seconds)
    setTimeout(() => {
        setIsDeploying(false); // Stop Spinner
        setShowToast(true);    // Show Popup
        
        // 2. Hide Popup after 4 seconds
        setTimeout(() => setShowToast(false), 4000);
    }, 3000);
  };

  return (
    <>
      {/* --- THE POPUP NOTIFICATION (Locked using Portal) --- */}
      {showToast && createPortal(
        <div className="fixed top-5 right-5 z-[9999] animate-bounce">
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                    <span className="font-bold">Success!</span> Deployment pipeline started.
                </div>
                <Toast.Toggle onDismiss={() => setShowToast(false)} />
            </Toast>
        </div>,
        document.body
      )}

      {/* --- THE WIZARD CARD --- */}
      <Card className="border-t-4 border-indigo-600 shadow-xl relative">
        
        {/* HEADER SECTION */}
        <div className="mb-6 border-b border-gray-100 pb-6 dark:border-gray-700">
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
              Prism
            </h1>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              by SRMTech
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Define your application specifications below. The automated pipeline will handle infrastructure provisioning.
          </p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleDeploy}>
          
          {/* SECTION 1: Project Details */}
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900 dark:text-white">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-indigo-700">1</span>
              Project Details
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="project_name">
                        Project Name <span className="text-red-500">*</span>
                    </Label>
                </div>
                <TextInput id="project_name" placeholder="srmist-inv" required />
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="environment">
                        Environment <span className="text-red-500">*</span>
                    </Label>
                </div>
                <Select id="environment" required>
                  <option value="dev">Development (dev)</option>
                  <option value="qa">QA / Testing</option>
                  <option value="prod">Production</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="repo_name">
                        Repository Name <span className="text-red-500">*</span>
                    </Label>
                </div>
                <TextInput id="repo_name" placeholder="sample-ci-project" required addon="git/" />
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="branch_name">
                        Branch Name <span className="text-red-500">*</span>
                    </Label>
                </div>
                <TextInput id="branch_name" placeholder="main" defaultValue="main" required />
              </div>
            </div>
          </div>

          {/* SECTION 2: Domain & Networking */}
          <div className="rounded-lg bg-gray-50 p-5 dark:bg-gray-800/50">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900 dark:text-white">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-indigo-700">2</span>
              Domain & Networking
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="base_domain">
                        Base Domain <span className="text-red-500">*</span>
                    </Label>
                </div>
                <TextInput id="base_domain" value="srm-tech.com" disabled readOnly className="opacity-70" />
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="region">
                        AWS Region <span className="text-red-500">*</span>
                    </Label>
                </div>
                <Select id="region" required>
                  <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                  <option value="us-east-1">US East (N. Virginia)</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="fe_subdomain">
                        Frontend Subdomain <span className="text-red-500">*</span>
                    </Label>
                </div>
                <TextInput id="fe_subdomain" placeholder="app" addon="https://" required />
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="be_subdomain">
                        Backend Subdomain <span className="text-red-500">*</span>
                    </Label>
                </div>
                <TextInput id="be_subdomain" placeholder="api" addon="https://" required />
              </div>
            </div>
          </div>

          {/* SECTION 3: Runtime */}
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900 dark:text-white">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-indigo-700">3</span>
              Application Runtime
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="fe_port">
                        Frontend Port <span className="text-gray-400 font-normal">(Default: 3000)</span>
                    </Label>
                </div>
                <TextInput id="fe_port" type="number" defaultValue={3000} />
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="be_port">
                        Backend Port <span className="text-gray-400 font-normal">(Default: 8000)</span>
                    </Label>
                </div>
                <TextInput id="be_port" type="number" defaultValue={8000} />
              </div>
            </div>
          </div>

          {/* SECTION 4: Options */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
             <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900 dark:text-white">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-indigo-700">4</span>
              Deployment Options
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                 <span className="text-sm font-medium text-gray-900 dark:text-white">Enable SSL</span>
                 <ToggleSwitch checked={sslEnabled} onChange={setSslEnabled} color="indigo" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                 <span className="text-sm font-medium text-gray-900 dark:text-white">Route53 Records</span>
                 <ToggleSwitch checked={route53Enabled} onChange={setRoute53Enabled} color="indigo" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                 <span className="text-sm font-medium text-gray-900 dark:text-white">Upload to S3</span>
                 <ToggleSwitch checked={s3UploadEnabled} onChange={setS3UploadEnabled} color="indigo" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                 <span className="text-sm font-medium text-gray-900 dark:text-white">IaC Branch</span>
                 <ToggleSwitch checked={iacBranchEnabled} onChange={setIacBranchEnabled} color="indigo" />
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="mt-4">
            <Button 
              type="submit" 
              size="xl" 
              gradientDuoTone="purpleToBlue" 
              className={`w-full font-bold shadow-lg transition-all ${isDeploying ? 'cursor-not-allowed opacity-80' : 'hover:scale-[1.01]'}`}
              disabled={isDeploying}
            >
              {isDeploying ? (
                  <div className="flex items-center">
                      <Spinner size="sm" light={true} className="mr-3" />
                      <span>Deploying...</span>
                  </div>
              ) : (
                  <span>Deploy</span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default DeploymentWizard;