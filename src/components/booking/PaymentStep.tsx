import type { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { DEPOSIT_AMOUNT_TZS, PAYMENT_ACCOUNTS } from "@/lib/payment";
import type { BookingInput } from "@/lib/booking-schema";

export function PaymentStep({ form }: { form: UseFormReturn<BookingInput> }) {
  return (
    <div className="space-y-8">
      <div className="border border-border-gold bg-accent p-6">
        <p className="eyebrow">Deposit requested</p>
        <p className="display mt-3 text-3xl text-gold">TZS {DEPOSIT_AMOUNT_TZS.toLocaleString()}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          This deposit helps us hold your slot. If you'd like to send full amount ahead of time, use one of the accounts below.
        </p>
      </div>

      <div className="space-y-3">
        <p className="eyebrow">Send to one of our accounts</p>
        {PAYMENT_ACCOUNTS.map((account) => (
          <div
            key={`${account.provider}-${account.accountNumber}`}
            className="border border-border p-4"
          >
            <p className="font-medium">{account.provider}</p>
            <p className="text-sm text-muted-foreground">
              {account.accountName} · {account.accountNumber}
            </p>
          </div>
        ))}
      </div>

      <label className="block">
        <span className="eyebrow">Payment reference </span>
        <Textarea
          className="mt-3"
          placeholder="If you've already sent the deposit, add the sender name so we can match it."
          {...form.register("paymentReference")}
        />
      </label>
    </div>
  );
}
