import { selectAllConversations } from "@berty/messenger-reducer"
import React from "react"
import { useAppSelector } from "../store"

export const ConversationsList: React.FC<{ setActiveConv: (convPK: string) => void }> = ({ setActiveConv }) => {
    const convs = useAppSelector(selectAllConversations)
    return <>
        {convs.map((conv) => {
            return <button key={conv.publicKey} onClick={() => setActiveConv(conv.publicKey || "")}>
                {conv.displayName}
            </button>
        })}
    </>
}