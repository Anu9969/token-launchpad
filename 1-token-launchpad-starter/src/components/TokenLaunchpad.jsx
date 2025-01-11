import { useConnection , useWallet} from "@solana/wallet-adapter-react";
import {Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"



export function MeraToken() {

    
    const {connection} = useConnection();
    const wallet = useWallet();

    async function createToken(){
        const keypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        

        //you create a new mint account
        //you first create a keypair for this new mint account
        //owners

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey:keypair.publicKey,
                space: 84,
                lamports,
                programId:TOKEN_2022_PROGRAM_ID,  //who owns this account
            }),
            createInitializeMint2Instruction(keypair.publicKey ,6,wallet.publicKey, wallet.publicKey, TOKEN_2022_PROGRAM_ID)
        );

        transaction.feePayer = wallet.publicKey;
        // const blockhash = await connection.getLatestBlockhash;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        transaction.partialSign(keypair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
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
        <input className='inputText' type='text' placeholder='Name' style={{padding:"8px", width:"250px", borderRadius:"8px"}}></input> <br />
        <input className='inputText' type='text' placeholder='Symbol' style={{padding:"8px", width:"250px", borderRadius:"8px"}}></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'style={{padding:"8px", width:"250px", borderRadius:"8px"}}></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'style={{padding:"8px", width:"250px", borderRadius:"8px"}}></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}