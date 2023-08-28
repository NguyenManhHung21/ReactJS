import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import ChatRoom from "./pages/ChatRoom";
import AuthProvider from "./AuthProvider";

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
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
