import React, { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { hashMessage } from "./utils/helper-functions";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

interface TranserParams {
  address: string;
  setBalance: (x: number) => void;
  privateKey: string;
}

const Transfer: React.FC<TranserParams> = ({
  address,
  setBalance,
  privateKey,
}) => {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const transfer = async (evt) => {
    evt.preventDefault();

    console.log("pressed");

    const data = {
      thing: "thing",
    };

    const messageHash = hashMessage(data);
    console.log("message hash", messageHash);

    try {
      const key = hashMessage(privateKey);
      console.log("key", key);
      const signature = secp256k1.sign(messageHash, key);

      console.log("sig", signature);

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature: signature[0],
      });
      setBalance(balance);
    } catch (ex) {
      alert(`${ex.response?.data?.message} someting went wrong ${ex.message}`);
      console.log(ex.message);
    }
  };

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
};

export default Transfer;
