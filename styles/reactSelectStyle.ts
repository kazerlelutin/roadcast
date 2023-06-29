const reactSelectStyle = {
  option: (provided: any, state: any) => {
    return {
      ...provided,
      color: state.isFocused ? 'var(--color-txt)' : 'var(--color-txt)',
      backgroundColor: state.isFocused ? 'var(--color-bg-accent)' : 'none',
      cursor: 'pointer',
      margin: '3px',
      width: 'calc(100% - 6px)',
      padding: 20,
      zIndex: 10,
    }
  },
  control: () => ({
    display: 'flex',
    padding: '5px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: 'var(--dms-card)',
  }),
  input: (provided: any) => ({
    ...provided,
    minWidth: '100px',
    color: 'var(--color-txt)',
  }),
  indicatorSeparator: () => ({
    width: '2px',
    height: '60%',
    background: 'var(--color-link)',
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    display: state.isFocused ? 'none' : 'inherit',
    padding: '0 10px',
  }),
  dropdownIndicator: (_provided: any, state: any) => ({
    color: `var(${state.hover ? '--color-border' : '--color-link'})`,
    padding: '0 5px',
    cursor: 'pointer',
    zIndex: 0,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1,
      transition = 'opacity 300ms',
      color = 'var(--color-text)'
    return { ...provided, opacity, transition, color }
  },
  menuList: (provided: any) => ({
    ...provided,
    margin: '0',
    padding: '0',
    background: 'var(--dms-bg-dark)',
    zIndex: 15,
    border: 'none',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    background: 'var(--dms-card-bg)',
    color: 'var(--color-text)',
    zIndex: 15,
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
}

export default reactSelectStyle
