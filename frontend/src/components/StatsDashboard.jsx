import React from 'react'

const StatsDashboard = ({ stats }) => {
  // FIX: Handle undefined stats
  if (!stats || Object.keys(stats).length === 0) {
    return <div style={{padding: '20px', textAlign: 'center'}}>Loading stats...</div>
  }

  return (
    <div>
      <h2>📊 Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.total_tickets || 0}</div>
          <div>Total Tickets</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
          <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.open_tickets || 0}</div>
          <div>Open Tickets</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
          <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.avg_tickets_per_day || 0}</div>
          <div>Avg/Day</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div>
          <h3 style={{ marginBottom: '12px' }}>Priority Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(stats.priority_breakdown || {}).map(([priority, count]) => (
              <div key={priority} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{priority}</span>
                <span style={{ fontWeight: '600' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '12px' }}>Category Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(stats.category_breakdown || {}).map(([category, count]) => (
              <div key={category} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{category}</span>
                <span style={{ fontWeight: '600' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsDashboard
