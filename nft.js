const connectBtn = document.getElementById('connectWallet');
const walletModal = document.getElementById('walletModal');
const walletClose = document.getElementById('walletClose');
const metaMaskBtn = document.getElementById('metaMaskBtn');
const walletConnectBtn = document.getElementById('walletConnectBtn');
const mintBtn = document.getElementById('mintNow');
const mintModal = document.getElementById('mintModal');
const mintClose = document.getElementById('mintClose');

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
        const walletConnectProvider = await WalletConnectEthereumProvider.init({
            projectId: 'ТВОЙ_ID_СЮДА',
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
        alert('Please switch to Ethereum Mainnet');
    }
}