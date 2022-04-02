import { grpc } from "@improbable-eng/grpc-web"
import { Service, rpcWeb, logger } from "@berty/grpc-bridge"
import beapi from "@berty/api"

const opts = {
    transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
    host: "http://127.0.0.1:9092",
}
const rpc = rpcWeb(opts)
export const client = Service(beapi.messenger.MessengerService, rpc, logger.create('MESSENGER'))
