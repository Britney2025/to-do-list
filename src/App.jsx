import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { TodoProvider } from "./context/TodoContext"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <Router>
      <TodoProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Layout>
      </TodoProvider>
    </Router>
  )
}

export default App
