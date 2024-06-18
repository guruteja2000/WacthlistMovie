import logo from "./logo.svg"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/reduxStore"
import AddMovie from "./AddMovie/AddMovie"
import EditMovie from "./EditMovie/EditMovie"
import Home from "./Home/Home"
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/" element={<Home />} />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
