import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export function hashMessage(message: any) {
  const bytes = utf8ToBytes(JSON.stringify(message));
  const hash = keccak256(bytes);
  return hash;
}
