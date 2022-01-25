import { QueryClient, QueryClientProvider } from "react-query";
import { Todos } from "./components/Todos";
import { Tweets } from "./components/Tweets";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Todos />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

export default App
