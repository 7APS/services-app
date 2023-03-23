// import Layouts from '@/components/Layouts';
// import '@/styles/globals.css'
import '@/styles/global.scss'
import 'antd/dist/reset.css';

export default function App({ Component, pageProps }) {
  // return (
  //   <Layouts>
  //     <Component {...pageProps} />
  //   </Layouts>
  // )

   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout || ((page) => page)

   return getLayout(<Component {...pageProps} />)
}
