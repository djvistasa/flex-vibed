import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import { theme } from "@common/theme";
import { GlobalStyles } from "@common/theme/globalStyles";
import { queryClient } from "@common/queryClient";
import NavBar from "@common/components/navBar";
import AppRoutes from "@common/router";
import { GlobalModal } from "@common/components/globalModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyles />
        <Router>
          <NavBar />
          <AppRoutes />
        </Router>
        <GlobalModal />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
