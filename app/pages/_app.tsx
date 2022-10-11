import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { TimezoneContextProvider } from '@/contexts/timezone-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TimezoneContextProvider>
        <Component {...pageProps} />
      </TimezoneContextProvider>
      <ToastContainer
        position="bottom-right"
        limit={1}
        autoClose={2200}
        toastClassName="toast"
        hideProgressBar={true}
      />
    </div>
  );
}

export default appWithTranslation(MyApp);
