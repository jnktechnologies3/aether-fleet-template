import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import OverviewPanel from './pages/dashboard/OverviewPanel'
import ThemeStudioPanel from './pages/dashboard/ThemeStudioPanel'
import FleetPanel from './pages/dashboard/FleetPanel'
import AgentKitPanel from './pages/dashboard/AgentKitPanel'
import SettingsPanel from './pages/dashboard/SettingsPanel'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<OverviewPanel />} />
            <Route path="theme" element={<ThemeStudioPanel />} />
            <Route path="fleet" element={<FleetPanel />} />
            <Route path="agent" element={<AgentKitPanel />} />
            <Route path="settings" element={<SettingsPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
