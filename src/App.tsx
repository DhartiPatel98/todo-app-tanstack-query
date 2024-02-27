import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Banner from "./components/Banner/Banner";
import TodoPage from "./pages/TodoPage";

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
