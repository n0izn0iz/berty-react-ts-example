import { streamEventToAction } from "@berty/messenger-reducer"
import { Provider } from 'react-redux'

import './App.css';
import { client } from "./client"
import { JoinGroup } from './components/JoinGroup';
import { store } from "./store"
import { useState } from 'react';

function App() {
  const [started, setStarted] = useState(false)
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
        {started && <div>
          <JoinGroup />
        </div>}
      </div>
    </Provider>
  );
}

export default App;