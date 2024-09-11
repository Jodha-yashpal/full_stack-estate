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
import {Layout, RequireAuth} from './routes/layout/Layout.jsx'
import ProfilePage from './routes/profilePage/ProfilePage.jsx'
import Register from './routes/register/Register.jsx'
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage.jsx'
import NewPostPage from './routes/newPostPage/NewPostPage.jsx'
import { listPageLoader, singlePageLoader } from './lib/loaders.js'
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
          element: <ListPage/>,
          loader: listPageLoader
        },
        {
          path:"/:id",
          element: <SinglePage/>,
          loader: singlePageLoader
        },
        {
          path:"/login",
          element: <Login/>
        },
        
        {
          path:"/register",
          element: <Register/>
        },
      ]
    },
    {
      path:"/",
      element: <RequireAuth />,
      children: [
        {
          path:"/profile",
          element: <ProfilePage/>
        },

        {
          path:"/profile/update",
          element: <ProfileUpdatePage/>
        },

        {
          path:"/add",
          element: <NewPostPage/>
        },
      ],
    },
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App