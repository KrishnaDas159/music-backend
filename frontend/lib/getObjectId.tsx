import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

const client = new SuiClient({ url: getFullnodeUrl("devnet") });

export async function getVaultObjectId(walletAddress: string , vaultName : string) {
  try {
    const response = await client.getOwnedObjects({
      owner: walletAddress,
      options: { showType: true },
    });

    const vaultObject = response.data.find(obj =>
      obj.data?.type?.includes(`::${vaultName}::${vaultName[0].toUpperCase() + vaultName.slice(1).toLowerCase()}`) 
    );

    if (vaultObject) {
      return vaultObject.data?.objectId;
    } else {
      console.warn("No vault object found.");
      return null;
    }
  } catch (err) {
    console.error("Error fetching vault object:", err);
    return null;
  }
}