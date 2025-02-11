import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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
