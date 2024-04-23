import React, { Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
const ProtectedRoute = ({ element, ...rest }) => {
  const accessToken = Cookies.get('accessToken')
  if (!accessToken) {
    // If no accessToken, redirect to login page
    return <Navigate to="/login" />
  }
  // Otherwise, render the requested component
  return <Outlet />
}
const LogedinRoute = ({ element, ...rest }) => {
  const accessToken = Cookies.get('accessToken')
  if (accessToken) {
    // If no accessToken, redirect to login page
    return <Navigate to="/dashboard" />
  }
  // Otherwise, render the requested component
  return <Outlet />
}

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Programs = React.lazy(() => import('./views/pages/programs/programs'))
const PricePrograms = React.lazy(() => import('./views/pages/pirceprograms/programs'))
const EditPricePrograms = React.lazy(() => import('./views/pages/pirceprograms/edit'))
const CreatePricePrograms = React.lazy(() => import('./views/pages/pirceprograms/create'))
const Cruis = React.lazy(() => import('./views/pages/cruis/programs'))

const CreateCruis = React.lazy(() => import('./views/pages/cruis/create'))
const EditCruis = React.lazy(() => import('./views/pages/cruis/edit'))
const CreatePrograms = React.lazy(() => import('./views/pages/programs/create'))
const EditPrograms = React.lazy(() => import('./views/pages/programs/edit'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Routespage = React.lazy(() => import('./views/pages/routespage/routespage'))
const CreateRoutes = React.lazy(() => import('./views/pages/routespage/create'))
const Maincategry = React.lazy(() => import('./views/pages/maincategory/maincategory'))
const Programscategry = React.lazy(() => import('./views/pages/programscategry/programscategry'))
const Createprogramscategry = React.lazy(() => import('./views/pages/programscategry/create'))
const Editprogramscategry = React.lazy(() => import('./views/pages/programscategry/edit'))
const CreateMaincategry = React.lazy(() => import('./views/pages/maincategory/create'))
const EditMaincategry = React.lazy(() => import('./views/pages/maincategory/edit'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter basename={'admin'}>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/programs" name="programs Page" element={<Programs />} />
            <Route exact path="/pirceprograms" name="programs Page" element={<PricePrograms />} />
            <Route exact path="/cruis" name="programs Page" element={<Cruis />} />
            <Route exact path="/cruis/create" name="programs Page" element={<CreateCruis />} />
            <Route exact path="/cruis/edit" name="programs Page" element={<EditCruis />} />
            <Route exact path="/routes" name="routes Page" element={<Routespage />} />
            <Route
              exact
              path="/routes/create"
              name="create programs Page"
              element={<CreateRoutes />}
            />

            <Route
              exact
              path="/programs/edit"
              name="edit programs Page"
              element={<EditPrograms />}
            />
            <Route
              exact
              path="/pirceprograms/edit"
              name="edit programs Page"
              element={<EditPricePrograms />}
            />
            <Route
              exact
              path="/programs/create"
              name="create programs Page"
              element={<CreatePrograms />}
            />
            <Route
              exact
              path="/pirceprograms/create"
              name="create programs Page"
              element={<CreatePricePrograms />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/maincategory" name="maincategory" element={<Maincategry />} />
            <Route
              exact
              path="/maincategory/create"
              name="maincategory"
              element={<CreateMaincategry />}
            />
            <Route
              exact
              path="/maincategory/edit"
              name="maincategory"
              element={<EditMaincategry />}
            />
            <Route exact path="/category" name="maincategory" element={<Programscategry />} />
            <Route
              exact
              path="/category/create"
              name="maincategory"
              element={<Createprogramscategry />}
            />
            <Route
              exact
              path="/category/edit"
              name="maincategory"
              element={<Editprogramscategry />}
            />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>
          <Route exact path="/" element={<LogedinRoute />}>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
