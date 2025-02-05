import { useState } from "react"
import Desktop from "./components/Desktop"
import Start from "./components/Start"
import { APPS } from "./config"

function App() {
    const [start, setStart] = useState(true);

    return (
        <>
            <Desktop background="https://www.dmoe.cc/random.php" apps={APPS} onExit={()=>setStart(false)}></Desktop>
            {
                !start ? <Start onClick={()=>setStart(true)}></Start> : <></>
            }
        </>
    )
}

export default App
