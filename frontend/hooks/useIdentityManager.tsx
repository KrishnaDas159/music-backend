import { IDENTITY_MANAGER_ADDRESS, IDENTITY_MANAGER_ABI } from "@/wallet-identity-module/constants/identityManager"
import { ethers } from "ethers"

export function getIdentityManagerContract(signerOrProvider: ethers.Signer | ethers.Provider) {

  console.log(IDENTITY_MANAGER_ABI)
  console.log(IDENTITY_MANAGER_ADDRESS)

  return new ethers.Contract(IDENTITY_MANAGER_ADDRESS, IDENTITY_MANAGER_ABI, signerOrProvider)
}
