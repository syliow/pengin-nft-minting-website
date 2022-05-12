import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import PenginNFT from "../PenginNFT.json";
import { DefaultIcon, Text } from "@chakra-ui/react";
import { useNumberInput, HStack, Button, Input, Box } from "@chakra-ui/react";

const penginNFTAddress = "0x846FB11a8A8B3186d172ed7F283693815a7A3e18";

const MainMint = (props) => {
  const { accounts, setAccounts } = props;

  //create a mint button
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);
  const [mintButton, setMintButton] = useState(false);

  const handleMint = async () => {
    console.log(mintAmount, "mint amount");
    if (window.ethereum) {
      //initial setup for ethers to interact with the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //requires sign to complete the transaction
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        penginNFTAddress,
        PenginNFT.abi,
        signer
      );
      try {
        //mint the Nft token
        //pass in the value amount of nft to mint
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log(response, "response");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 30,
      onChange: (valueAsString, valueAsNumber) => setMintAmount(valueAsNumber),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const handleDecrement = () => {
    console.log(mintAmount, "mint decrease");
    if (mintAmount <= 1) {
      return;
    }
    console.log("DECREASE");
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    console.log(mintAmount, "mint increase");
    if (mintAmount >= 10) {
      return;
    }
    setMintAmount(mintAmount + 1);
  };

  //   window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [{
  //         chainId: "0x89",
  //         rpcUrls: ["https://rpc-mainnet.matic.network/"],
  //         chainName: "Rinkeby Testnet",
  //         nativeCurrency: {
  //             name: "MATIC",
  //             symbol: "MATIC",
  //             decimals: 18
  //         },
  //         blockExplorerUrls: ["https://polygonscan.com/"]
  //     }]
  // });
  console.log(mintAmount, "mint amount");
  return (
    <div>
      {isConnected ? (
        <>
          <Box>
            <Text fontSize="50px" style={{ color: "#639cd9" }}>
              Mint Your Pengin NFTs Now
            </Text>
            <Text style={{color:"white"}}>Price: 0.02 ETH</Text>

            {/* <HStack maxWidth="320px"> */}
            <Box>
              <Button cursor="pointer" padding="15px" {...dec}>
                -
              </Button>

              <Input
                isReadOnly={true}
                textAlign="center"
                type="number"
                paddingLeft="15px"
                margin="15px"
                height="35px"
                style={{ color: "white" }}
                {...input}
                maxWidth="50px"
              />
              <Button {...inc}>+</Button>
            </Box>

            {/* </HStack> */}

            <Button
              onClick={handleMint}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#5454c5"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
              borderRadius={5}
              paddingLeft="25px"
              paddingRight="25px"
            >
              Mint
            </Button>
          </Box>
        </>
      ) : (
        <div>
          <p>Connect your Metamask to mint Pengin NFT.</p>
        </div>
      )}
    </div>
  );
};
export default MainMint;
