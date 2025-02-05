import { Outlet, useParams } from "react-router-dom"
import MainComponent from "./components/MainComponent"
import SideBar from "./components/SideBar"
import TopSellers from "./components/TopSellers"
import { PopularBlogs } from "./components/PopularBlogs"

const App = () => {
  const { id } = useParams()
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="rounded, w-full flex justify-evenly flex-wrap   ">
        {
          id ? <Outlet /> : <MainComponent />
        }
        <div></div>
        <div className="fixed right-5 bottom-5 overflow-y-auto h-full scrollbar-none ">
          <TopSellers />
          <PopularBlogs />
        </div>
      </div>
    </div>
  )
}

export default App