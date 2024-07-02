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

  // FUNCTION TO ADD A NEW INVOICE

  // FUNTION TO DELETE AN INVOICE

  // FUNCTION TO UPDATE AN INVOICE

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}

export default InvoiceProvider;
