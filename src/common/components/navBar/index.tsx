import { useLocation } from "react-router-dom";
import { useUIStore } from "@common/stores/ui";
import { FilterForm } from "@common/components/filterForm";

import {
  StyledNavBarContainer,
  StyledNavBarBrand,
  StyledNavBarContent,
  StyledNavBarNav,
  StyledNavBarItem,
  StyledNavBarLink,
  StyledNavBarActions,
  StyledFilterButton,
} from "./styles";
import type { INavItem } from "./types";

function NavBar() {
  const location = useLocation();
  const showModal = useUIStore((state) => state.showModal);
  const hideModal = useUIStore((state) => state.hideModal);

  const navItems: INavItem[] = [];

  const handleOpenFilterModal = (): void => {
    showModal({
      title: "Filter & Sort Ratings",
      showFooter: false,
      children: <FilterForm onClose={hideModal} />,
    });
  };

  return (
    <StyledNavBarContainer>
      <StyledNavBarBrand>
        <h2>The Flex Global</h2>
      </StyledNavBarBrand>

      <StyledNavBarContent>
        <StyledNavBarNav>
          {navItems.map((item) => (
            <StyledNavBarItem key={item.path}>
              <StyledNavBarLink
                to={item.path}
                $isActive={location.pathname === item.path}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </StyledNavBarLink>
            </StyledNavBarItem>
          ))}
        </StyledNavBarNav>

        <StyledNavBarActions>
          {location.pathname === "/" && (
            <StyledFilterButton onClick={handleOpenFilterModal}>
              Filter & Sort
            </StyledFilterButton>
          )}
        </StyledNavBarActions>
      </StyledNavBarContent>
    </StyledNavBarContainer>
  );
}

export default NavBar;
