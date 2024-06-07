import "./ThemeSetting.css"
import {useState} from "react";

function ThemeSwitch() {

    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.getAttribute("theme") === "dark")

    function changeTheme() {
        setIsDarkMode(!isDarkMode)
        document.documentElement.setAttribute('theme', isDarkMode ? 'light' : 'dark');
    }

    return <div className={"theme-setting"} onClick={changeTheme}>
        {!isDarkMode ? <span>☀️</span>:<span>🌙</span>}
    </div>
}

export {ThemeSwitch}