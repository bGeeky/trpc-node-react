import React, { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { trpc } from "./trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";
import Form from "./components/Form";
import PostsList from "./components/PostsList";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: "http://localhost:8000/api/trpc",
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Form />
        <PostsList />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
