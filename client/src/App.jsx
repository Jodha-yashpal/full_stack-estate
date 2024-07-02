import HomePage from './routes/homepage/HomePage.jsx'
import SinglePage from './routes/singlePage/SinglePage.jsx'
import Login from './routes/login/Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom"
import ListPage from './routes/listPage/ListPage.jsx'
import Layout from './routes/layout/Layout.jsx'
import ProfilePage from './routes/profilePage/ProfilePage.jsx'
import Register from './routes/register/Register.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element: <HomePage/>
        },
        {
          path:"/list",
          element: <ListPage/>
        },
        {
          path:"/:id",
          element: <SinglePage/>
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/profile",
          element: <ProfilePage/>
        },
        {
          path:"/register",
          element: <Register/>
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App