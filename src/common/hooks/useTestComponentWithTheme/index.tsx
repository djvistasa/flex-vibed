import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type RenderOptions = {
  withRouter?: boolean;
  initialRoute?: string;
};

function useTestComponentWithTheme() {
  const renderWithTheme = (
    component: ReactElement,
    options?: RenderOptions
  ): RenderResult => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    let wrappedComponent = (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </QueryClientProvider>
    );

    if (options?.withRouter) {
      const initialEntries = options.initialRoute
        ? [options.initialRoute]
        : ["/"];
      wrappedComponent = (
        <MemoryRouter initialEntries={initialEntries}>
          {wrappedComponent}
        </MemoryRouter>
      );
    }

    return render(wrappedComponent);
  };

  return renderWithTheme;
}

export default useTestComponentWithTheme;
