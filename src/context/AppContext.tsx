import React,{createContext} from 'react'

export const AppContext = createContext(defaultValue);

export const AppProvider: React.FC<{
    children: React.ReactNode;
  }> = ({children}) => {
    const [value, setValue] = React.useState(0);

    return (
        <AppContext.Provider value={{
            value, 
            setValue,
        }}>
            {children}
        </AppContext.Provider>
    )
}
