"use client";

import { Button } from "@/components/ui/button";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid h-full place-items-center">
      <div className="max-w-[21rem] space-y-6 text-center">
        <p className="text-lg text-muted-foreground">{error.message}</p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          {" "}
          Try again
        </Button>
      </div>
    </div>
  );
}

export default Error;
