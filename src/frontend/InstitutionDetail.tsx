import "./InstitutionDetail.scss";
import { useEffect, useState } from "react";
import {
  InstitutionDetails,
  InstitutionId,
  Item,
} from "../declarations/backend/backend.did";
import { backend } from "../declarations/backend";
import { useParams } from "react-router-dom";
import { getImageSource } from "./common";
import { AuthClient } from "@dfinity/auth-client";
// import { ClipLoader } from "react-spinners"; // Import ClipLoader component

function InstitutionDetail() {
  const { id } = useParams();
  const institutionId = BigInt(id as string);

  const [institutionDetails, setInstitutionDetails] = useState<
    InstitutionDetails | undefined
  >();
  const [newPrice, setNewPrice] = useState(0);
  const [lastError, setLastError] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchFromBackend = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        setInstitutionDetails(
          await backend.getInstitutionDetails(institutionId)
        );
        console.log("details ",setInstitutionDetails);
        const authClient = await AuthClient.create();
        setAuthenticated(await authClient.isAuthenticated());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchFromBackend();
    const intervalId = setInterval(fetchFromBackend, 1000);
    // Clean-up function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [institutionId]);

  const displayItem = (item: Item) => {
    return (
      <>
        <h1 className="h">{item.title}</h1>
        <div className="overview">
          <div className="overview-description">{item.description}</div>
          {!!item.image?.length && (
            <div className="overview-image">
              <img src={getImageSource(item.image)} alt="Institution image" />
            </div>
          )}
        </div>
      </>
    );
  };

  const showHistory = () => {
    return <div className="section"></div>;
  };

  const showInstitution = () => {
    if (institutionDetails == null) {
      throw Error("undefined Institution");
    }

    const isClosed =
      institutionDetails != null;
    return <>{displayItem(institutionDetails.item)}</>;
  };

  return (
    <>
      {loading ? (
        <div className="">
          <span color="#ffffff" > Loading ..... </span>
        </div>
      ) : (
        <>
          {institutionDetails == null ? (
            <div className="h">Loading Institution Details </div>
          ) : (
            showInstitution()
          )}
        </>
      )}
    </>
  );
}

export default InstitutionDetail;
