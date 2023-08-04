import Analytics from "@/components/Analytics";
import "devextreme/dist/css/dx.light.css";
import "antd/dist/reset.css";
import "../../input.css";

export const metadata = {
  title: "SOUPE APP",
  description: "Soupe app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Analytics />
        <h1 className="hidden">layout Root</h1>
        {children}
      </body>
    </html>
  );
}
