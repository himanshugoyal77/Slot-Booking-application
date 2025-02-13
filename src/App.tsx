import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Availability from "./pages/Availability";

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className="relative h-full w-full">
      <div
        className={
          "relative flex flex-col min-h-screen " +
          (theme === "dark" ? "bg-[#141414] text-white" : "bg-[#FEFEFE]")
        }
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

const UsersPage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Users</h1>
    <p>Manage your users here.</p>
  </div>
);

const MessagesPage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Messages</h1>
    <p>Your messages and communications.</p>
  </div>
);

const NotificationsPage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Notifications</h1>
    <p>Your notification center.</p>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Settings</h1>
    <p>Manage your application settings.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <SettingsPage />,
          },
          {
            path: "availability",
            element: <Availability />,
          },
          {
            path: "messages",
            element: <MessagesPage />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <AuthPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
