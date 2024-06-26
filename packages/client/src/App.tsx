import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";

import "./index.scss";
import { ItemSearch } from "./ItemSearch";

const client = new QueryClient();

const AppContent = () => {
  return (
    <ItemSearch />
    // <div className="mt-10 text-md mx-auto max-w-6xl">
    //   <div>
    //     <pre>{JSON.stringify(colesData.data)}</pre>
    //   </div>
    // </div>
  );
};

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
