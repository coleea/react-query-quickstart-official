import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from 'axios'

const queryclient = new QueryClient()

function App() {
  // const [count, setCount] = useState(0)

  // const somequeryclient = useQueryClient()

  const { isLoading, error, data, isFetching , status} = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://api.github.com/repos/tannerlinsley/react-query")
        .then((res) => res.data),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  // if (error) return "An error has occurred: " 

  return (
    <>
      {/* <QueryClientProvider client={queryclient}> */}
      {status === "success" &&      
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{" "}
            <strong>✨ {data.stargazers_count}</strong>{" "}
            <strong>🍴 {data.forks_count}</strong>
            <div>{isFetching ? "Updating..." : ""}</div>
            <ReactQueryDevtools initialIsOpen />
        </div>
      }
      {
        status !== "success" &&
        <div className="">not success</div>
      }
      {/* </QueryClientProvider>       */}
    </>
  )
}

export default App
