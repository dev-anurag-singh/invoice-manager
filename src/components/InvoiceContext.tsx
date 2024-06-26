import { TInvoice } from "@/lib/types";
import { createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import data from "@/data.json";

const InvoiceContext = createContext<TInvoice[] | null>(null);

function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue, removeValue] = useLocalStorage<TInvoice[] | null>(
    "invoices",
    null,
  );

  useEffect(() => {
    if (!value) {
      setValue(data);
    }
  }, [value, setValue]);

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}

export default InvoiceProvider;
