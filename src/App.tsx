import { useCallback, useEffect, useState } from "react"
import Desktop from "./components/Desktop"
import StartUp, { StartUpState } from "./components/StartUp"
import { APPS, TRAYS } from "./config"

function App() {
    const [start, setStart] = useState(true);
    const [state, setState] = useState<StartUpState>('executing')
    const [installPrompt, setInstallIrompt] = useState<Event>();

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

    useEffect(() => {
        const setPrompt = (event:Event) => {
            event.preventDefault();
            setInstallIrompt(event);
        }

        const unsetPrompt = () => {
            setInstallIrompt(undefined);
        }

        window.addEventListener("beforeinstallprompt", setPrompt);
        window.addEventListener("appinstalled", unsetPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt", setPrompt);
            window.removeEventListener("appinstalled", unsetPrompt);
        }
    }, [])

    return (
        start ? <Desktop background="https://www.dmoe.cc/random.php" apps={APPS} trays={TRAYS} installPrompt={installPrompt} onExit={onExit}></Desktop> : <StartUp state={state} onClick={onStart}></StartUp>    
    )
}

export default App
