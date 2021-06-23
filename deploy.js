const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
const colors = require('colors')

const provider = new HDWalletProvider(
  process.env.HD_WALLET, process.env.PROVIDER

)

const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account'.green, accounts[0])
    const result = await new web3.eth
      .Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['hi there!'] })
      .send({ gas: '1000000', from: accounts[0] })

    console.log('Contract deployed to'.green, result.options.address)
  } catch (error) {
    console.log(`${error}`.yellow)
  }


}

deploy()