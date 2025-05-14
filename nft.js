const connectBtn = document.getElementById('connect-wallet-btn');
const walletModal = document.getElementById('wallet-modal');
const walletClose = document.getElementById('close-wallet-modal');
const metaMaskBtn = document.getElementById('metamask-btn');
const walletConnectBtn = document.getElementById('walletconnect-btn');
const mintBtn = document.getElementById('mint-btn');
const mintModal = document.getElementById('mint-modal');
const mintClose = document.getElementById('close-mint-modal');

let provider;

connectBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
});

walletClose.addEventListener('click', () => {
    walletModal.style.display = 'none';
});

mintBtn.addEventListener('click', () => {
    mintModal.style.display = 'flex';
});

mintClose.addEventListener('click', () => {
    mintModal.style.display = 'none';
});

metaMaskBtn.addEventListener('click', async () => {
    try {
        if (!window.ethereum) {
            alert('MetaMask not installed');
            return;
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const network = await provider.getNetwork();

        if (network.chainId !== 1) {
            await switchToMainnet();
            return;
        }

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        connectBtn.textContent = shortenAddress(address);
        walletModal.style.display = 'none';
    } catch (error) {
        if (error.code === 4001) {
            alert('Connection rejected');
        } else {
            alert('Error connecting to MetaMask');
        }
    }
});

walletConnectBtn.addEventListener('click', async () => {
    try {
        const walletConnectProvider = new window.WalletConnectEthereumProvider.default({
            projectId: 'f9b7841db816aa2c7eed858793aeb629',
            chains: [1],
            showQrModal: true
        });

        await walletConnectProvider.enable();

        provider = new ethers.providers.Web3Provider(walletConnectProvider);
        const network = await provider.getNetwork();

        if (network.chainId !== 1) {
            alert('Please switch to Ethereum Mainnet');
            return;
        }

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        connectBtn.textContent = shortenAddress(address);
        walletModal.style.display = 'none';
    } catch (error) {
        alert('Error connecting to WalletConnect');
    }
});

function shortenAddress(address) {
    return address.slice(0, 6) + '...' + address.slice(-4);
}

async function switchToMainnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }]
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            alert('Mainnet not found in MetaMask');
        } else {
            alert('Please switch to Ethereum Mainnet');
        }
    }
}
