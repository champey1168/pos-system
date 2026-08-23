
export default function Select({ label, error, options = [], className = '', id, ...props }) {
  
  const selectId = id || props.name
  return (
    
    <label className={`field ${className}`} htmlFor={selectId}>
      
      {label ? <span>{label}</span> : null}
      <select id={selectId} className={error ? 'input has-error' : 'input'} {...props}>
        
        {options.map((option) => {
          
          
          const value = typeof option === 'string' ? option : option.value
          const labelText = typeof option === 'string' ? option : option.label
          
          return <option key={value} value={value}>{labelText}</option>
        })}
      </select>
      
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}
