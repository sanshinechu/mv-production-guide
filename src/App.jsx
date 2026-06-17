import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tutorial from './pages/Tutorial'
import Assistant from './pages/Assistant'
import AppLayout from './components/Layout/AppLayout'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/:stepId" element={<Tutorial />} />
          <Route path="/assistant" element={<Assistant />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
