import { TInvoice } from "@/lib/types";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import data from "@/data.json";

interface ContextType {
  invoices: TInvoice[];
  deleteInvoice: (id: string) => void;
}

const InvoiceContext = createContext<ContextType>({} as ContextType);

function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue, removeValue] = useLocalStorage<TInvoice[]>(
    "invoices",
    data,
  );

  useEffect(() => {
    setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  // FUNCTION TO ADD A NEW INVOICE

  // FUNTION TO DELETE AN INVOICE
  function deleteInvoice(id: string) {
    if (!value) return;
    const filteredInvoices = value?.filter((invoice) => invoice.id !== id);
    setValue(filteredInvoices);
  }

  // FUNCTION TO UPDATE AN INVOICE

  return (
    <InvoiceContext.Provider value={{ invoices: value, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  return context;
}

export default InvoiceProvider;
