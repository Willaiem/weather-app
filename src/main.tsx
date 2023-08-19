import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { z } from "zod";
import { App } from "./App";
import { UnitProvider } from "./context/UnitContext";
import "./index.css";

const envVariables = z.object({
  VITE_WEATHER_API_KEY: z.string()
})

envVariables.parse(import.meta.env)


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UnitProvider>
        <App />
      </UnitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
