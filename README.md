# Prism / DevOps Automation Dashboard
### by SRMTECH

![Prism Dashboard Banner](https://via.placeholder.com/1200x400.png?text=Prism+Dashboard+Preview)
*(Replace this link with a real screenshot of your dashboard)*

## 💎 Overview

**Prism** is a high-performance, aesthetically engineered frontend interface for modern DevOps pipelines. Designed with a **"Phantom Glass"** aesthetic, it provides a mission-control style environment for developers to provision infrastructure, monitor deployments, and manage server logs.

The interface prioritizes clarity, minimizing visual noise while retaining a premium, technical feel using **React**, **Tailwind CSS**, and **Flowbite**.

## ✨ Key Features

* **Deployment Wizard:** A streamlined, multi-step form to configure projects, domains, ports, and SSL settings.
* **Glassmorphism UI:** Features a custom "Tech Grid" background, frosted glass cards, and "Diamond" borders.
* **Real-time Monitoring:** Interactive ApexCharts for deployment frequency and server health status.
* **Adaptive Theme:** Fully responsive Light and Dark modes with "Onyx" and "Indigo" accents.
* **Zero-Clutter Navigation:** A transparent "Ghost" sidebar and navbar that blend seamlessly into the background.

## 🛠️ Tech Stack

* **Framework:** [React 18](https://reactjs.org/) (Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Components:** [Flowbite React](https://flowbite-react.com/)
* **Icons:** [React Icons (Heroicons)](https://react-icons.github.io/react-icons/)
* **Charts:** [ApexCharts](https://apexcharts.com/)
* **Language:** TypeScript

## 🚀 Getting Started

Follow these steps to run the dashboard locally.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/mukesh-1608/DevOps-Dashboard-Frontend.git](https://github.com/mukesh-1608/DevOps-Dashboard-Frontend.git)
    cd DevOps-Dashboard-Frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173` to view the dashboard.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI widgets (Navbar, Sidebar, Charts)
├── layouts/          # Main page wrappers (NavbarSidebarLayout)
├── pages/            # View controllers (Dashboard, Settings, etc.)
├── index.css         # Global Tailwind directives & Glass effects
└── main.tsx          # Entry point
