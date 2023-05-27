import { ConfigProvider } from 'antd';
import '../../input.css';
import 'antd/dist/reset.css';
import 'devextreme/dist/css/dx.light.css';

export const metadata = {
    title: 'SOUPE APP',
    description: 'Soupe app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <h1 className='hidden'>layout Root</h1>
                {children}
            </body>
        </html>
    )
}
