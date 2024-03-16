import "./App.scss";
import motoko from "./assets/motoko.png";
import InstitutionList from "./InstitutionList";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstitutionDetail from "./InstitutionDetail";
import ImageSlider from "./ImageSlider";
import NewInstitution from "./newInstitution";
import NewProfile from "./newProfile";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes></Routes>
        <ImageSlider />
      </div>

      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<InstitutionList />} />
          <Route path="/newInstitution" element={<NewInstitution />} />
          <Route path="/viewInstitution/:id" element={<InstitutionDetail />} />
          <Route path="/newProfile" element={<NewProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
