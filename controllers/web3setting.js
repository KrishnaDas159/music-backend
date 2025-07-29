import User from "../models/web3setting.js";


export const updateWeb3Settings = async (req, res) => {
  try {
    const { defaultNetwork, preferredYieldProtocol, gasLimit, slippageTolerance } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        web3Settings: {
          defaultNetwork,
          preferredYieldProtocol,
          gasLimit,
          slippageTolerance
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.web3Settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
