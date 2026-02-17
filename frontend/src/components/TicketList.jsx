import React, { useState } from 'react'

const TicketList = ({ tickets, onUpdate }) => {
  const [filters, setFilters] = useState({
    category: '',
    priority: '',
    status: '',
    search: ''
  })
  const [updatingId, setUpdatingId] = useState(null)

  const categories = ['billing', 'technical', 'account', 'general']
  const priorities = ['low', 'medium', 'high', 'critical']
  const statuses = ['open', 'in_progress', 'resolved', 'closed']

  const updateTicketStatus = async (ticketId, newStatus) => {
    setUpdatingId(ticketId)
    try {
      const res = await fetch(`/api/tickets/${ticketId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) onUpdate()
    } catch (error) {
      console.error('Update error:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    return (!filters.category || ticket.category === filters.category) &&
           (!filters.priority || ticket.priority === filters.priority) &&
           (!filters.status || ticket.status === filters.status) &&
           (!filters.search || 
            ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            ticket.description.toLowerCase().includes(filters.search.toLowerCase()))
  })

  return (
    <div>
      <h2>🎫 Tickets ({filteredTickets.length})</h2>
      
      <div className="filters">
        <select 
          value={filters.category} 
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select 
          value={filters.priority} 
          onChange={(e) => setFilters({...filters, priority: e.target.value})}
        >
          <option value="">All Priorities</option>
          {priorities.map(pri => (
            <option key={pri} value={pri}>{pri}</option>
          ))}
        </select>
        
        <select 
          value={filters.status} 
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">All Statuses</option>
          {statuses.map(stat => (
            <option key={stat} value={stat}>{stat.replace('_', ' ')}</option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Search tickets..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </div>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {filteredTickets.map(ticket => (
          <div key={ticket.id} className="ticket">
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>{ticket.title}</div>
            <div style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
              {ticket.description.length > 100 
                ? ticket.description.slice(0, 100) + '...' 
                : ticket.description}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>
                {ticket.category}
              </span>
              <span className="badge" style={{ 
                background: ticket.priority === 'critical' ? '#fee2e2' : 
                           ticket.priority === 'high' ? '#fed7aa' : '#ecfdf5',
                color: ticket.priority === 'critical' ? '#dc2626' : 
                       ticket.priority === 'high' ? '#ea580c' : '#059669'
              }}>
                {ticket.priority}
              </span>
              <span className="badge" style={{ background: '#f3f4f6', color: '#374151' }}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
            
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              {new Date(ticket.created_at).toLocaleString()}
            </div>
            
            {updatingId !== ticket.id && (
              <div style={{ marginTop: '12px' }}>
                <select
                  defaultValue={ticket.status}
                  onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                  style={{ fontSize: '13px' }}
                >
                  {statuses.map(stat => (
                    <option key={stat} value={stat}>
                      {stat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {updatingId === ticket.id && <small>Updating...</small>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicketList
