import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FilterProvider } from './components/FilterContext.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductPage from './components/ProductPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "product/:id",
        element: <ProductPage />
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <FilterProvider>
    <RouterProvider router={router} />
  </FilterProvider>
)
