










export default function Table({ columns = [], data = [], empty = 'No records found.', rowKey = 'id' }) {
  return (
    
    <div className="table-wrap">
      <table className="data-table">
        
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.header}</th>)}</tr>
        </thead>
        <tbody>
          
          {data.length ? data.map((row, index) => (
            
            <tr key={row[rowKey] || index}>
              

              {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          )) : (
            
            <tr><td colSpan={columns.length} className="empty-cell">{empty}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
