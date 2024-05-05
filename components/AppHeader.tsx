import { useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";

const IS_WALLET_CONNECTED = "isWalletConnected";

export default function AppHeader() {
	const { enableWeb3, account, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis();

	useEffect(() => {
		const isWalletConnected = JSON.parse(localStorage.getItem(IS_WALLET_CONNECTED)!);
		if (isWalletConnected) {
			enableWeb3();
		}

		Moralis.onAccountChanged((account) => {
			// When logged out from an account
			if (!account) {
				localStorage.setItem(IS_WALLET_CONNECTED, JSON.stringify(false));
				deactivateWeb3();
			}
		});
	}, []);

	const handleConnectClick = async () => {
		await enableWeb3();
		localStorage.setItem(IS_WALLET_CONNECTED, JSON.stringify(true));
	};

	const statusContent = useMemo(() => {
		return account
			? `Connected to: ${account.slice(0, 6)}...${account.slice(-6)}`
			: "Connect Wallet";
	}, [account]);

	return (
		<header>
			<section>
				<button disabled={!!account || isWeb3EnableLoading} onClick={handleConnectClick}>
					{statusContent}
				</button>
			</section>
		</header>
	);
}
