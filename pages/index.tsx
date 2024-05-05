import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
// import { AppHeader } from "./components";
import { AppHeaderV2 } from "../components/AppHeaderV2";
import { LotteryEntrance } from "../components/LotteryEntrance";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Smart Contract Lottery</title>
				<meta name="description" content="Decentralized Smart Contract Lottery" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				{/* <AppHeader /> */}
				<AppHeaderV2 />
				<LotteryEntrance />
			</main>
		</>
	);
}
