import React, { useState, useEffect } from 'react'

const TicketForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'low'
  })
  const [loading, setLoading] = useState(false)
  const [classifying, setClassifying] = useState(false)

  const categories = ['billing', 'technical', 'account', 'general']
  const priorities = ['low', 'medium', 'high', 'critical']

  const classifyTicket = async () => {
    if (!formData.description.trim()) return
    
    setClassifying(true)
    try {
      const res = await fetch('/api/tickets/classify/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: formData.description })
      })
      const data = await res.json()
      setFormData(prev => ({
        ...prev,
        category: data.suggested_category || 'general',
        priority: data.suggested_priority || 'low'
      }))
    } catch (error) {
      console.error('Classification error:', error)
    } finally {
      setClassifying(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/tickets/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setFormData({ title: '', description: '', category: 'general', priority: 'low' })
        onSuccess()
      }
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>📝 New Ticket</h2>
      <form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Ticket title (max 200 chars)"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value.slice(0, 200)})}
            required
            maxLength={200}
            disabled={loading}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <textarea
            placeholder="Describe your issue..."
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            onBlur={classifyTicket}
            required
            disabled={loading}
          />
          {classifying && <small>🤖 AI classifying...</small>}
        </div>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            disabled={loading}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            disabled={loading}
          >
            {priorities.map(pri => (
              <option key={pri} value={pri}>{pri.charAt(0).toUpperCase() + pri.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading || !formData.title || !formData.description}>
          {loading ? '⏳ Creating...' : '✅ Create Ticket'}
        </button>
      </form>
    </div>
  )
}

export default TicketForm
