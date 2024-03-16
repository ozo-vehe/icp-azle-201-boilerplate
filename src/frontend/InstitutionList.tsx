import "./InstitutionList.scss";
import { useEffect, useState } from "react";

import { backend } from "../declarations/backend";
import { Link, useNavigate } from "react-router-dom";
import { getImageSource } from "./common";
<h1>Current Registred Institution / Companies</h1>;
function InstitutionList() {
  const [list, setList] = useState<any[] | undefined>();
  const navigate = useNavigate();
  const navigationLink = (instutitionId: number) =>
    "/viewInstitution/" + instutitionId;

  const overviewList = list?.map((overview) => {
    const id = +overview.id.toString();

    return (
      <li
        key={id}
        className="gallery-item"
        onClick={(_) => navigate(navigationLink(id))}
      >
        <div className="title">{overview.item.title}</div>
        <div className="description">{overview.item.description}</div>
        {!!overview.item.image?.length && (
          <img
            src={getImageSource(overview.item.image)}
            alt="Institution image"
          />
        )}
        <div className="gallery-item-link">
          <Link to={navigationLink(id)}>
            {" "}
            <div className="button_new"> View Institution details </div>
          </Link>
        </div>
      </li>
    );
  });

  const fetchInstitutions = async () => {
    let result = await backend.getOverviewList();
    setList(result);
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return (
    <>
      {list == null && (
        <div className="section">
          Please wait while we are Loading registered Institutions...
        </div>
      )}
      {list?.length == 0 && (
        <div className="section">No Registred Company / Intitution so far</div>
      )}
      {list != null && list.length > 0 && (
        <ul className="gallery">{overviewList}</ul>
      )}
    </>
  );
}

export default InstitutionList;
