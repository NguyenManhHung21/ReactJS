import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import ChatRoom from "./pages/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatRoom />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFoundPage />,
    },
  ]);
  return (
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
