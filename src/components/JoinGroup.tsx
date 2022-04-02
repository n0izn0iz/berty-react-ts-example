import React, { useState } from "react"

import { client } from "../client"

export const JoinGroup: React.FC = () => {
    const [link, setLink] = useState("")
    return <>
        <input onChange={(ev) => setLink(ev.target.value)} />
        <button onClick={async () => {
            client.conversationJoin({ link })
        }}>
            Join
        </button>
    </>
}