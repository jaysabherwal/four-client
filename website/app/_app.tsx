import { SocketProvider } from "@/components/providers/socket-provider";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
    <SocketProvider>
        <Component { ...pageProps } />
    </SocketProvider>
}