import React, { useState, useEffect } from 'react'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import StatsDashboard from './components/StatsDashboard'

function App() {
  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshData = () => {
    setRefreshKey(prev => prev + 1)
  }

  useEffect(() => {
    fetchTickets()
    fetchStats()
  }, [refreshKey])

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/tickets/')
      const data = await res.json()
      setTickets(data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/tickets/stats/')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Support Ticket System</h1>
        <p>AI-powered ticket categorization & analytics</p>
      </header>

      <div className="grid">
        <div className="card">
          <TicketForm onSuccess={refreshData} />
        </div>
        
        <div className="card">
          <StatsDashboard stats={stats} />
        </div>
      </div>

      <div className="card">
        <TicketList tickets={tickets} onUpdate={refreshData} />
      </div>
    </div>
  )
}

export default App
