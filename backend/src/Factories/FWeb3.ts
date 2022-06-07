import Web3 from 'web3';


export function getWeb3() {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    return new Web3(provider);
}

export default getWeb3;