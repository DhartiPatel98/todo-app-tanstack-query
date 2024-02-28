import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Banner from "./components/Banner/Banner";
import TodoPage from "./pages/TodoPage";

/* 
Query Client: https://tanstack.com/query/latest/docs/reference/QueryClient
useQueryClient: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient
useQuery: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
Query Keys: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
useMutation: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
*/

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Banner />
        <TodoPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
