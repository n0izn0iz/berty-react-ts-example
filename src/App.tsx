import { streamEventToAction } from "@berty/messenger-reducer"
import { Provider } from 'react-redux'

import './App.css';
import { client } from "./client"
import { InputWithTrigger } from './components/InputWithTrigger';
import { store } from "./store"
import { useState } from 'react';
import { ConversationsList } from "./components/ConversationsList";
import { ConversationView } from "./components/ConversationView";

function App() {
  const [started, setStarted] = useState(false)
  const [activeConv, setActiveConv] = useState("")
  return (
    <Provider store={store}>
      <div className="App">
        {!started && <button onClick={async () => {
          const stream = await client.eventStream({})
          stream.onMessage(msg => {
            if (!msg?.event) {
              console.log("got msg:", msg)
              return
            }
            const action = streamEventToAction(msg.event)
            if (!action) {
              console.warn("could not convert msg to action:", msg)
              return
            }
            console.log("got stream action:", action)
            store.dispatch(action)
          })
          await stream.start()
          setStarted(true)
        }}>
          Start event stream
        </button>}
        {started && <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: "calc(min(1vh, 1vw))", boxSizing: "border-box", backgroundColor: "lightgrey" }}>
            <InputWithTrigger triggerName="Join" onTrigger={async (link) => {
              client.conversationJoin({ link })
            }} />
            <div style={{ paddingTop: "calc(min(1vh, 1vw))" }} />
            <ConversationsList setActiveConv={setActiveConv} />
          </div>
          <ConversationView publicKey={activeConv} />
        </div>}
      </div>
    </Provider>
  );
}

export default App;