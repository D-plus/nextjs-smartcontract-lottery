import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
// @ts-ignore
import { NotificationProvider } from "web3uikit";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MoralisProvider initializeOnMount={false}>
			<NotificationProvider>
				<Component {...pageProps} />
			</NotificationProvider>
		</MoralisProvider>
	);
}
