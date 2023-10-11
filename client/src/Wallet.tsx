import React from "react";
import server from "./server";

interface WalletParams {
  address: string;
  setAddress: (x: string) => void;
  balance: number;
  setBalance: (x: number) => void;
  privateKey: string;
  setPrivateKey: (x: string) => void;
}

const Wallet: React.FC<WalletParams> = ({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) => {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance: Number },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance.toString()}</div>
    </div>
  );
};

export default Wallet;
