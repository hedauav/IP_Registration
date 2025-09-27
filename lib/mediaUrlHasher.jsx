import { Blocklock, encodeCiphertextToSolidity } from "blocklock-js";
import { ethers, AbiCoder } from "ethers";
import { account } from './utils';
export default function mediaUrlHasher(url) {   
    const blocklockjs = new Blocklock(
        account,
        "0xfF66908E1d7d23ff62791505b2eC120128918F44"
      );
    const msgBytes = AbiCoder.defaultAbiCoder().encode(["string"], [url]);
    const encodedMessage = ethers.getBytes(msgBytes);
    console.log("mediaUrlHasher", url);
    const blockHeight  = BigInt(15122004); 
    const ciphertext = blocklockjs.encrypt(encodedMessage, blockHeight);
    console.log("ciphertext", ciphertext);
    return ciphertext;

}