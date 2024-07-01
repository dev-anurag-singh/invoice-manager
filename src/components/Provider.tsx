"use client";
import { ThemeProvider } from "next-themes";
import InvoiceProvider from "./InvoiceContext";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      disableTransitionOnChange
    >
      <InvoiceProvider>{children}</InvoiceProvider>
    </ThemeProvider>
  );
}

export default Provider;
