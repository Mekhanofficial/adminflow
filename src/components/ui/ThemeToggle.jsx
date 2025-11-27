import React, { useState } from 'react'
import "../styles/theme.css"
export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = ()=>{
        setTheme((prevTheme)=> (prevTheme === 'light' ? 'dark' : 'light'))
    }
  return (
    <>
    <div className={` theme-card ${theme}`}>
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
    </div>
    </>
  )
}
