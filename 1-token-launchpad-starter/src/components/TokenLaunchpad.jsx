

export function TokenLaunchpad() {

    const wallet = useWallet();

    async function createToken(){
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();

        //you create a new mint account
    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}