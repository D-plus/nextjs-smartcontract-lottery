Built with ❤️ using:
NextJS
Solidity
Chainlink
Moralis
web3uikit
Ethers
Hardhat
IPFS

## Quickstart

```
git clone https://github.com/D-plus/nextjs-smartcontract-lottery.git
cd nextjs-smartcontract-lottery
yarn
yarn dev
```

## Formatting in VSCode

To have VSCode extension prettier auto-format `.jsx` and `.tsx`, add the following to your settings.json file:

```
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
```

# Usage

1. Run your local blockchain with the lottery code

> In a different terminal / command line

```
git clone https://github.com/D-plus/hardhat-smartcontract-lottery.git
cd hardhat-smartcontract-lottery
yarn 
yarn hardhat node
```

> You can read more about how to use that repo from it's [README.md](https://github.com/D-plus/hardhat-smartcontract-lottery/blob/main/README.md)


2. Add hardhat network to your metamask/wallet

- Get the RPC_URL of your hh node (usually `http://127.0.0.1:8545/`)
- Go to your wallet and add a new network. [See instructions here.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)
  - Network Name: Hardhat-Localhost
  - New RPC URL: http://127.0.0.1:8545/
  - Chain ID: 31337
  - Currency Symbol: ETH (or GO)
  - Block Explorer URL: None

Ideally, you'd then [import one of the accounts](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) from hardhat to your wallet/metamask. 

3. Run this code

In another terminal, using the code from this repo, run:

```
yarn dev
```

4. Go to UI and have fun!

Head over to your [localhost](http://localhost:3000) and play with the lottery!


## Testing

I didn't write any front end tests 😢

If you'd like to create some tests for this repo, please make a PR!

# Deploying to IPFS

1. Build your static code.

```
yarn build
```

2. Export your site

```
yarn next export
```

> Note: Some features of NextJS & Moralis are not static, if you're deviating from this repo, you might run into errors. 

3. Deploy to IPFS

- [Download IPFS desktop](https://ipfs.io/#install)
- Open your [IPFS desktop app](https://ipfs.io/)
- Select `import` and chose the folder the above step just created (should be `out`)

4. Copy the CID of the folder you pinned

![IPFS](./img/readme-ipfs.png)

5. Get [IPFS companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en) for your browser (or use [Brave Browser](https://brave.com/))

5. Go to `ipfs://YOUR_CID_HERE` and see your ipfs deployed site!


# Deploy to IPFS using Fleek

You can also have [Fleek](https://fleek.co/) auto-deploy your website if you connect your github. Connect to fleek and follow along the docs there. You'll get an IPFS hash and a "regular" URL for your site. 


# Linting

To check linting / code formatting:
```
yarn lint
```

# Thank you!

[![Dmytro Burzak Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dmitriy-burzak/)