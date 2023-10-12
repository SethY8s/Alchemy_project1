const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // 87f6a43e780437c07b590167d56076821726c6e1399e06b92c633a61bdcf67d6
  "02f40e6bf1a106e93c20cb67b3d08b51f03fc5e9006cff1c567c9f3d4c03ec5837": 100,
  // 05d340ad6804c0a3fc68d56edb99fe38f9d4e2b421be5fe176e62e5bf4c38acc
  "037a0d7a8ae38058a2f424fe51d7cd4b1719c7078c5c585d8fb311fdcd85fe437b": 50,
  // fbbd124853a3f905c01a171d385c754bb856bc3659ffafc60a2a47442bb0167d
  "032736c5f456d09808b96329db43360bc640c534c5577ea87f15a64010fc2ad3fd": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
