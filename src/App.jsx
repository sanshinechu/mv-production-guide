import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tutorial from './pages/Tutorial'
import Assistant from './pages/Assistant'
import AppLayout from './components/Layout/AppLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/:stepId" element={<Tutorial />} />
          <Route path="/assistant" element={<Assistant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
