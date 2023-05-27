'use client'

import { ConfigProvider } from "antd";

export default function AuthLayout({ children }) {
    return (
        <div>
            <ConfigProvider theme={{ token: { colorPrimary: '#545cad' } }} >
                <h2 className='hidden'>layout Auth</h2>
                {children}
            </ConfigProvider>
        </div>
    )
}