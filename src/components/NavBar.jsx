//create a navbar component

import React from "react";

const NavBar = (props) => {
  const { accounts, setAccounts } = props;
  const isConnected = Boolean(accounts);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        //provide all the accounts exists in the user's metamask wallet
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <>
            <h1>Connected</h1>
            <button
            // onClick={disconnectAccount}
            >
              Disconnect
            </button>
          </>
        </div>
      ) : (
        <div>
          <h1>Not Connected</h1>
          <button onClick={connectAccount}>Connect</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
