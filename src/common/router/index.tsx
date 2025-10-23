import { Routes, Route } from "react-router-dom";
import Dashboard from "@features/ratings/pages/dashboard";
import Listing from "@features/listings/pages/listing";
import { StyledAppContainer } from "./styles";

function AppRoutes() {
  return (
    <StyledAppContainer>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/listing/:listingId" element={<Listing />} />
      </Routes>
    </StyledAppContainer>
  );
}

export default AppRoutes;
