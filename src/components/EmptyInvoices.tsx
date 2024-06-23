import Image from "next/image";

function EmptyInvoices() {
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col items-center gap-11 md:gap-16">
        <Image
          src={"/empty.svg"}
          alt="no invoices"
          width={194}
          height={160}
          className="md:w-60"
        />
        <div className="space-y-6">
          <h3 className="text-lg">There is nothing here</h3>
          <div className="text-center text-xs text-foreground-light">
            <p>Create an invoice by clicking the</p>
            <p>
              <span className="mr-0.5 font-bold">New</span>
              <span className="mr-0.5 hidden font-bold md:inline-block">
                Invoice
              </span>
              button and get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyInvoices;
