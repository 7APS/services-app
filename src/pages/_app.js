import { useEffect, useState } from 'react';
// import Layouts from '@/components/Layouts';
// import '@/styles/globals.css'
import '@/styles/global.scss'
import 'antd/dist/reset.css';

const navigatorValue = typeof window !== 'undefined' ? navigator : null;

if ('serviceWorker' === navigatorValue) {
  window.addEventListener('load', function () {
    navigatorValue.serviceWorker.register('/service-worker.js')
      .then(function (registration) {
        console.log('Service worker registrado com sucesso:', registration.scope);
      })
      .catch(function (error) {
        console.log('Falha ao registrar o service worker:', error);
      });
  });
}


export default function App({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const handleConnectionChange = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('offline', handleConnectionChange);
    window.addEventListener('online', handleConnectionChange);

    return () => {
      window.removeEventListener('offline', handleConnectionChange);
      window.removeEventListener('online', handleConnectionChange);
    };
  }, []);

  const getLayout = Component.getLayout || ((page) => page)
  return isConnected ? getLayout(<Component {...pageProps} />) : <Offline />;
}

function Offline() {
  return (
    <div>
      Você está offline.
    </div>
  );
}
