import React, { createContext} from 'react'

export const dataContext = createContext();

export default function GlobalContext({ children }) {
    const value = 'Debparna';
  return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
  )
}
