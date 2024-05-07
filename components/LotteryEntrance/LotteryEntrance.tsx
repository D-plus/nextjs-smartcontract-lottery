import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers, ContractTransaction, ContractInterface } from "ethers";
// @ts-ignore
import { useNotification, Button } from "web3uikit";
import { abi, contractAddresses } from "@/constants";

interface contractAddressesInterface {
	[key: string]: string[];
}

export function LotteryEntrance() {
	const { chainId: chainIdHex, isWeb3Enabled, account, isWeb3EnableLoading } = useMoralis();
	const [entranceFee, setEntranceFee] = useState<string>("0");
	const [amountOfPlayers, setAmountOfPlayers] = useState<string>("0");
	const [recentWinner, setRecentWinner] = useState<string>();
	const [isSubscribedToContractWinnerPickedEvent, setSubscribedToContractWinnerPickedEvent] =
		useState<boolean>(false);

	const chainId = parseInt(chainIdHex!);
	// @ts-ignore
	const contractAddress = contractAddresses[chainId]?.[0];

	const {
		runContractFunction: enterRaffle,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi,
		// @ts-ignore
		contractAddress,
		functionName: "enterRaffle",
		params: {},
		msgValue: entranceFee,
	});

	const { runContractFunction: getEntranceFee } = useWeb3Contract({
		abi,
		// @ts-ignore
		contractAddress,
		functionName: "getEntranceFee",
		params: {},
	});

	const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
		abi,
		// @ts-ignore
		contractAddress,
		functionName: "getNumberOfPlayers",
	});

	const { runContractFunction: getRecentWinner } = useWeb3Contract({
		abi,
		// @ts-ignore
		contractAddress,
		functionName: "getRecentWinner",
	});

	const showNotification = useNotification();

	const displayContractState = async () => {
		const fee = (await getEntranceFee()) as string;
		const amountOfPlayersResult = ((await getNumberOfPlayers()) as string)?.toString();
		const recentWinnerResult = (await getRecentWinner()) as string;

		setEntranceFee(fee || "0");
		setAmountOfPlayers(amountOfPlayersResult);
		setRecentWinner(recentWinnerResult);
	};

	useEffect(() => {
		return () => {
			const cleanUp = async () => {
				if (contractAddress) {
					const provider = await new ethers.providers.Web3Provider(window?.ethereum);
					const contract = await new ethers.Contract(
						contractAddress,
						abi as ContractInterface,
						provider,
					);
					contract.removeAllListeners();
				}
			};

			cleanUp();
		};
	}, []);

	useEffect(() => {
		if (isWeb3Enabled) {
			displayContractState();
		}
	}, [isWeb3Enabled]);

	const subscribeToContractsEvents = async () => {
		if (window?.ethereum && contractAddress && !isSubscribedToContractWinnerPickedEvent) {
			const provider = await new ethers.providers.Web3Provider(window?.ethereum);
			const contract = await new ethers.Contract(
				contractAddress,
				abi as ContractInterface,
				provider,
			);

			contract.on("WinnerPicked", async (recentWinner, data) => {
				// prevent showing old events added to previous blocks
				if (data.blockNumber >= (await provider.getBlockNumber())) {
					setRecentWinner(recentWinner);
					displayContractState();

					showNotification({
						title: "Winner picked!",
						type: "info",
						message: `The winner is: ${recentWinner}`,
						position: "topR",
					});
				}
			});
			setSubscribedToContractWinnerPickedEvent(true);
		}
	};

	const handleSuccessEnterToLottery = async (tx: ContractTransaction) => {
		await tx.wait(1);

		subscribeToContractsEvents();

		displayContractState();

		showNotification({
			type: "info",
			message: "Let's wait for the winner to be chosen",
			title: "Successfully entered to the Lottery",
			position: "topR",
		});
	};

	const handleErrorDuringEnterToLottery = (error: any) => {
		showNotification({
			type: "warning",
			message: error.message,
			title: "Transcation error",
			position: "topR",
		});
	};

	const hanldeEnterLotteryClick = async () => {
		try {
			await enterRaffle({
				// onSuccess/onError checks if transcation was successfully sent to metamask
				throwOnError: false,
				onSuccess: (tx) => handleSuccessEnterToLottery(tx as ContractTransaction),
				onError: handleErrorDuringEnterToLottery,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<article className="w-full">
			<section>
				{contractAddress ? (
					<section>
						<section className="flex justify-center">
							<Button
								disabled={!account || isWeb3EnableLoading || isLoading || isFetching}
								onClick={hanldeEnterLotteryClick}
								text="Enter lottery"
								theme="primary"
								isLoading={isLoading || isFetching}
							/>
						</section>
						<p className="mt-10 text-sm">
							<b>Lottery Entrance Fee:</b> {ethers.utils.formatUnits(entranceFee, "ether")} ETH
						</p>
						<p className="mt-1 text-sm">
							<b>Number Of Players:</b> {amountOfPlayers}
						</p>
						<p className="mt-1 text-sm">
							<b>Recent Winner:</b> {recentWinner}
						</p>
					</section>
				) : (
					"Selected network is not supported yet..."
				)}
			</section>
		</article>
	);
}
