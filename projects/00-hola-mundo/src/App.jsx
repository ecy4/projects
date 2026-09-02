import './App.css'
import { TwitterFollowCard } from './TewitterFollowCard'

export function App() {
    return (
        <main className="layout">

            <section className="app">
                <TwitterFollowCard userName="elonmusk" name="Elon Musk" />
                <TwitterFollowCard userName="naval" name="Naval Ravikant" />
                <TwitterFollowCard userName="MrBeast" name="MrBeast" />
            </section>

            <section className="contenido">
            
            </section>

        </main>
    )
}