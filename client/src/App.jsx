import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "../components/Header"
import Post from "../components/Post"
import Layout from "../components/Layout"
// import IndexPage from "../pages/IndexPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import { UserContextProvider } from "./UserContext"
import CreatePost from "../pages/CreatePost"
// import PostPage from "../pages/PostPage"
import EditPost from "../pages/EditPost"
const LazyIndexPage = lazy(() => import("../pages/IndexPage"))
const LazyPostPage = lazy(() => import("../pages/PostPage"))
import SkeletonPost from "../components/skeleton/SkeletonPost"

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route 
            index
            element={
              <Suspense fallback={
                [...Array(5).keys()].map(i => {
                  return <SkeletonPost key={i}/>
                })
              }>
                <LazyIndexPage />
              </Suspense>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route 
            path="/post/:id" 
            element={
              <Suspense fallback={<SkeletonPost />}>
                <LazyPostPage />
              </Suspense>
            } 
          />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
