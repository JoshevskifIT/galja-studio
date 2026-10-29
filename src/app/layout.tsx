import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galja Studio | Каталог на производи",
  description: "Персонализирани честитки, менија и детали за вашите посебни моменти. Разгледајте формати, материјали и цени.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="mk"><body>{children}</body></html>;
}
