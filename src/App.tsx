import Desktop from "./components/Desktop"
import { APPS } from "./config"

function App() {

    return (
        <Desktop background="https://www.dmoe.cc/random.php" apps={APPS}></Desktop>
    )
}

export default App
