import "./Navigation.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { backend } from "../declarations/backend";
import motoko from "./assets/p10.jpeg";

function Navigation() {
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
  const [needLogin, setNeedLogin] = useState(true);

  const authClientPromise = AuthClient.create();

  const signIn = async () => {
    const authClient = await authClientPromise;

    const internetIdentityUrl = import.meta.env.PROD
      ? undefined
      : `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => resolve(undefined),
      });
    });

    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(false);
  };

  const signOut = async () => {
    const authClient = await authClientPromise;
    await authClient.logout();
    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(true);
  };

  const updateIdentity = (identity: Identity) => {
    setPrincipal(identity.getPrincipal());
    (Actor.agentOf(backend) as HttpAgent).replaceIdentity(identity);
  };

  const setInitialIdentity = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      updateIdentity(identity);
      setNeedLogin(!(await authClient.isAuthenticated()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInitialIdentity();
  }, []);

  return (
    <>
      <div className="menu">
        {!needLogin ? (
          <>
            {/* <div className="menu-item button_new">
              <Link to="/">My Accredetation Request sent </Link>
            </div> */}

            {/* create a profile */}
            <div className="menu-item button_new">
              {/* Use the standard Link component */}
              <Link to="/NewProfile">Create Profile </Link>
            </div>

            <div className="menu-item-button button_new" onClick={signOut}>
              Sign Out
            </div>
            <div className="menu-item-button button_new">
              <div className="principal text">
                ICP Identity Logged in as: {principal?.toString()}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="menu-item button_new">
              <Link to="/newInstitution">Submit a request</Link>
            </div>

            <div className="menu-item button_new">
              {/* Use the standard Link component */}
              <Link to="/">View Registered Intitutions </Link>
            </div>

            <div className="menu-item-button button_new" onClick={signIn}>
              Sign in
            </div>
          </>
        )}
      </div>
    </>
  );
}
<footer>
  <p>&copy; 2024 E-Portfolio Blockchain System. All rights reserved.</p>
</footer>;

export default Navigation;
