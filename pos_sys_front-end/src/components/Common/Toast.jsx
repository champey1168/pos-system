import { useMemo, useState } from 'react'

import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react'

import { ToastContext } from '../../context/toastContext.js'

const icons = { success: CheckCircle2, error: XCircle, warning: TriangleAlert, info: Info }

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const value = useMemo(() => ({

    notify(message, type = 'success') {

      const id = Date.now() + Math.random()

      setToasts((items) => [...items, { id, message, type }])

      window.setTimeout(() => setToasts((items) => items.filter((toast) => toast.id !== id)), 3200)
    },

  }), [])
  return (
    <ToastContext.Provider value={value}>

      {children}

      <div className="toast-stack" aria-live="polite">

        {toasts.map((toast) => {

          const Icon = icons[toast.type] || Info

          return <div className={`toast toast-${toast.type}`} key={toast.id}><Icon size={18} />{toast.message}</div>
        })}
      </div>
    </ToastContext.Provider>
  )
}
