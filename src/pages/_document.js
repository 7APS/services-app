import { ConfigProvider } from 'antd'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#545cad' }
      }}
    >
      <Html lang="pt-br">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </ConfigProvider>
  )
}
