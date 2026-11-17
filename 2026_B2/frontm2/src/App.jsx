import {AppProvider} from "./core/context.jsx";
import {ThemeProvider} from "./core/themeContext.jsx";
import {RouterProvider} from "react-router-dom";
import {routing} from "./core/routing.jsx";

function App() {
    return (
        <ThemeProvider>
            <AppProvider>
                <RouterProvider router={routing}/>
            </AppProvider>
        </ThemeProvider>
    )
}

export default App
