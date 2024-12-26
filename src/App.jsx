import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/layout/Layout";
import HomePage from "./routes/homePage/HomePage";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/SinglePage";
import Register from "./routes/register/Register";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Login from "./routes/login/Login";
import About from "./routes/about/About";
import Contact from "./routes/contact/Contact";
function App() {
  const router = createHashRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {path:'/home',
      element:<HomePage/>
    },
    {
      path:'/list',
      element:<ListPage/>
    },
    {
      path:'/:id',
      element:<SinglePage/>
    },
    {
      path:'/',
      element:<Register/>
    
    },
    {
      path:'/profile',
      element:<ProfilePage/>
    
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/about',
      element: <About/>
    },
    {
      path:'/contact',
      element: <Contact/>
    },
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
export default App