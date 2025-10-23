import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

import type { RenderResult } from "@testing-library/react";

import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function useTestComponentWithTheme() {
  const renderWithTheme = (component: ReactElement): RenderResult => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </QueryClientProvider>
    );
  };

  return renderWithTheme;
}

export default useTestComponentWithTheme;
