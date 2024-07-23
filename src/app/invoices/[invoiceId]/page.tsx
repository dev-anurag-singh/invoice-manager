"use client";
import { useIsMounted } from "@/app/hooks/useIsMounted";
import { DeleteInvoice } from "@/components/DeleteInvoice";
import EditInvoice from "@/components/EditInvoice";
import { useInvoice } from "@/components/InvoiceContext";
import InvoiceStatus from "@/components/InvoiceStatus";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

function Page({ params }: { params: { invoiceId: string } }) {
  const { invoices, markAsPaid } = useInvoice();
  const [isMounted] = useIsMounted();

  const invoice =
    invoices && invoices.find((inv) => inv.id === params.invoiceId);

  if (!isMounted || !invoices) return <Loading />;
  if (!invoice) {
    notFound();
  }

  const handlePaid = () => {
    markAsPaid(invoice.id);
  };

  return (
    <div className="container space-y-8 pb-32 pt-8 md:py-12 lg:py-16">
      <Link href={"/"} className="flex items-center gap-6 px-3">
        <span>
          <ChevronLeft className="h-4 w-4 stroke-primary stroke-[3px]" />
        </span>
        <span className="mt-1 text-sm">Go back</span>
      </Link>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted p-6 shadow-sm md:justify-start md:gap-5 md:px-8">
          <p className="text-xs text-foreground-light">Status</p>
          <InvoiceStatus status={invoice.status} />
          <div className="fixed bottom-0 left-0 z-10 flex w-screen justify-end gap-2 border-t bg-muted/95 px-10 py-6 text-muted-foreground backdrop-blur md:static md:ml-auto md:mr-2 md:w-auto md:border-none md:p-0 md:backdrop-blur-none">
            <EditInvoice invoice={invoice} />
            {/* Delete Invoice Modal */}
            <DeleteInvoice id={invoice.id} />
            {/* MARK AS PAID BUTTON ONLY AVALIABLE WHEN INVOICE STATUS IS PENDING */}
            {invoice.status === "pending" && (
              <Button onClick={handlePaid}>Mark as Paid</Button>
            )}
          </div>
        </div>
        <div className="space-y-8 rounded-lg bg-muted p-6 text-muted-foreground shadow-sm md:space-y-5 md:p-8 lg:p-12">
          <div className="space-y-7 md:flex md:justify-between md:space-y-0">
            <div className="space-y-1">
              <h4 className="text-sm md:text-md">
                <span className="mr-0.5">#</span>
                <span className="text-foreground">{invoice.id}</span>
              </h4>
              <p className="text-xs">{invoice.description}</p>
            </div>
            <p className="flex flex-col text-base">
              <span>{invoice.senderAddress.street}</span>
              <span>{invoice.senderAddress.city}</span>
              <span>{invoice.senderAddress.postCode}</span>
              <span>{invoice.senderAddress.country}</span>
            </p>
          </div>
          <div className="gap-28 space-y-8 md:flex md:space-y-0">
            <div className="flex gap-16 md:gap-28">
              <div className="flex flex-col justify-between gap-3">
                <div className="space-y-3">
                  <p className="text-xs">Invoice Date</p>
                  <h4 className="text-md leading-5 text-foreground">
                    {moment(invoice.invoiceDate).format("D MMM YYYY")}
                  </h4>
                </div>
                <div className="space-y-3">
                  <p className="text-xs">Payment Due</p>
                  <h4 className="text-md leading-5 text-foreground">
                    {moment(invoice.paymentDue).format("D MMM YYYY")}
                  </h4>
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-3">
                  <p className="text-xs">Bill To</p>
                  <h4 className="text-md leading-5 text-foreground">
                    {invoice.clientName}
                  </h4>
                </div>
                <p className="flex flex-col text-base">
                  <span>{invoice.clientAddress.street}</span>
                  <span>{invoice.clientAddress.city}</span>
                  <span>{invoice.clientAddress.postCode}</span>
                  <span>{invoice.clientAddress.country}</span>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs">Sent to</p>
              <h4 className="text-md leading-5 text-foreground">
                {invoice.clientEmail}
              </h4>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-md bg-accent pt-2 text-accent-foreground md:mt-[3rem!important] md:pt-4">
            <Table className="">
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead className="w-[50%] pl-8">Item Name</TableHead>
                  <TableHead className="text-center">QTY.</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="pr-8 text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {invoice.items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="relative pb-6 pl-4 capitalize text-foreground md:pb-4 md:pl-8">
                      {item.name}
                      <span className="absolute bottom-0 left-4 text-xs md:hidden">
                        {item.quantity} x $ {item.price}
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-center md:table-cell">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="hidden text-right md:table-cell">
                      $ {item.price}
                    </TableCell>
                    <TableCell className="pl-0 pr-4 text-right text-foreground md:pl-4 md:pr-8">
                      $ {item.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-t-[1rem] border-accent bg-carbon-blue text-white dark:bg-[#0C0E16]">
                <TableRow>
                  <TableCell className="py-6 pl-4 md:pl-8">
                    Grand Total
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    className="hidden md:table-cell"
                  ></TableCell>
                  <TableCell className="pl-0 pr-4 text-right text-lg leading-8 md:pl-4 md:pr-8">
                    $ {invoice.total}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
