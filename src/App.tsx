import { Suspense, useCallback, useState } from "react"
import Desktop from "./components/Desktop"
import StartUp, { StartUpState } from "./components/StartUp"
import { APPS, TRAYS } from "./config"

function App() {
    const [start, setStart] = useState(true);
    const [state, setState] = useState<StartUpState>('executing')

    const onStart = useCallback(() => {
        setState('executing');
        setTimeout(()=>setStart(true), 500);
    }, []);

    const onExit = useCallback(() => {
        setStart(false);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setTimeout(()=>setState('exiting'), 500);
    }, []);

    return (
        <Suspense>
        {
            start ? 
            <Desktop background="https://www.dmoe.cc/random.php" apps={APPS} trays={TRAYS} onExit={onExit}></Desktop> 
            : 
            <StartUp state={state} onClick={onStart}></StartUp>    
        }
        </Suspense>
    )
}

export default App
