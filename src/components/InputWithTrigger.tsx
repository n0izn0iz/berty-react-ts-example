import React, { useState } from "react"

export const InputWithTrigger: React.FC<{ triggerName: string; onTrigger: (val: string) => void }> = ({ triggerName, onTrigger }) => {
    const [val, setVal] = useState("")
    return <div>
        <input value={val} onChange={(ev) => setVal(ev.target.value)} />
        <button onClick={() => { onTrigger(val); setVal("") }}>
            {triggerName}
        </button>
    </div>
}