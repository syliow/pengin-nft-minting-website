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

  // Check if MetaMask is installed
  // MetaMask injects the global API into window.ethereum
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x4",
                rpcUrl: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please install Metamask: https://metamask.io/download.html"
    );
  }

  return (
    <Box>
      {isConnected ? (
        <>
          <Box>
            <Text fontSize="50px" style={{ color: "#639cd9" }}>
              Mint Your Pengin NFTs Now
            </Text>
            <Text style={{ color: "white", fontSize: 22 }}>
              Price: 0.02 ETH
            </Text>

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
        <Box>
          <p
            style={{
              fontSize: 25,
              marginTop: "70px",
              fontWeight: "bold",
              color: "#639cd9",
            }}
          >
            Connect your Metamask to mint Pengin NFT.
          </p>
        </Box>
      )}
    </Box>
  );
};
export default MainMint;
