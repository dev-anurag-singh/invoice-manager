"use client";
import { Suspense } from "react";
import { useInvoice } from "@/components/InvoiceContext";
import { useIsMounted } from "../hooks/useIsMounted";
import Loading from "@/components/Loading";
import Invoices from "@/components/Invoices";

export default function Home() {
  const { invoices } = useInvoice();
  const [isMounted] = useIsMounted();

  if (!isMounted || !invoices) return <Loading />;

  return (
    <Suspense>
      <Invoices invoices={invoices} />
    </Suspense>
  );
}
