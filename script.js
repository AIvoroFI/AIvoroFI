const connectBtn = document.getElementById('connectWallet');
const mintBtn = document.getElementById('mintNow');
const mintModal = document.getElementById('mintModal');
const mintClose = document.getElementById('mintClose');

let provider;

connectBtn.addEventListener('click', async () => {
    try {
        const { EthereumProvider } = window.WalletConnectModal;

        provider = await EthereumProvider.init({
            projectId: 'f9b7841db816aa2c7eed858793aeb629',
            chains: [1],
            showQrModal: true
        });

        await provider.connect();

        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const address = await signer.getAddress();
        const network = await ethersProvider.getNetwork();

        if (network.chainId !== 1) {
            alert('Please switch to Ethereum Mainnet');
            return;
        }

        connectBtn.textContent = shortenAddress(address);
    } catch (error) {
        if (error.code === 4001) {
            alert('Connection rejected');
        } else {
            alert('Error connecting wallet');
        }
    }
});

mintBtn.addEventListener('click', () => {
    mintModal.style.display = 'flex';
});

mintClose.addEventListener('click', () => {
    mintModal.style.display = 'none';
});

function shortenAddress(address) {
    return address.slice(0, 6) + '...' + address.slice(-4);
}
