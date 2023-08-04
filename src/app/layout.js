"use client";

import { useEffect } from "react";
import { Router } from "next/router";

import Analytics from "@/components/Analytics";
import * as gtag from "@/libs/gtag";

import "devextreme/dist/css/dx.light.css";
import "antd/dist/reset.css";
import "../../input.css";

export const metadata = {
  title: "SOUPE APP",
  description: "Soupe app",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [Router.events]);

  return (
    <html lang="pt-BR">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
