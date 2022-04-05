import { selectConversation, selectConversationInteractions } from "@berty/messenger-reducer"
import beapi from "@berty/api"
import React from "react"
import { client } from "../client"
import { useAppSelector } from "../store"
import { InputWithTrigger } from "./InputWithTrigger"

const InteractionsList: React.FC<{ publicKey: string }> = ({ publicKey }) => {
    const intes = useAppSelector(state => selectConversationInteractions(state, publicKey))
    return <>
        {[...intes].reverse().map((inte) => {
            if (inte.type !== beapi.messenger.AppMessage.Type.TypeUserMessage) {
                return null
            }
            return <div key={inte.cid} style={{ textAlign: "start" }}>{inte.payload?.body}</div>
        })}
    </>
}

// TODO use https://github.com/danbovey/react-infinite-scroller#readme and fetch more messages

export const ConversationView: React.FC<{ publicKey: string }> = ({ publicKey }) => {
    const conv = useAppSelector(state => selectConversation(state, publicKey))
    return <div style={{ padding: "calc(min(1vh, 1vw))", height: "100vh", boxSizing: "border-box", display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
            {conv?.displayName}
        </div>
        <div>
            <InteractionsList publicKey={publicKey} />
            <InputWithTrigger triggerName="Send" onTrigger={async (msg) => {
                const payload = beapi.messenger.AppMessage.UserMessage.encode({ body: msg }).finish()
                await client.interact({ type: beapi.messenger.AppMessage.Type.TypeUserMessage, payload, conversationPublicKey: publicKey })
            }} />
        </div>
    </div>
}