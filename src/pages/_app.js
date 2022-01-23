import '@/styles/globals.css'
import { Layout } from '@/src/components/'
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from '@/src/redux/store'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>

  )
}

export default MyApp
