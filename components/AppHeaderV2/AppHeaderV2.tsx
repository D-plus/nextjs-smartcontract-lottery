// @ts-ignore
import { ConnectButton } from "web3uikit";

import styles from "./AppHeaderV2.module.scss";

export default function AppHeaderV2() {
	return (
		<header className={`${styles.headerContainer} border-b-2 pb-2 mb-10`}>
			<section>
				<h1 className="text-xl">Decentralized Lottery</h1>
			</section>
			<section>
				<ConnectButton moralisAuth={false} />
			</section>
		</header>
	);
}
