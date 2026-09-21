import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DEPOSIT_AMOUNT_TZS, PAYMENT_ACCOUNTS } from "@/lib/payment";
import type { BookingInput } from "@/lib/booking-schema";
import { cn } from "@/lib/utils";

export function PaymentStep({ form }: { form: UseFormReturn<BookingInput> }) {
  const selectedProvider = form.watch("paymentAccountProvider");

  return (
    <div className="space-y-8">
      <div className="border border-border-gold bg-accent p-6">
        <p className="eyebrow">Deposit requested</p>
        <p className="display mt-3 text-3xl text-gold">TZS {DEPOSIT_AMOUNT_TZS.toLocaleString()}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          This deposit helps us hold your slot. If you'd like to send it ahead of time, choose which
          account you're paying to below.
        </p>
      </div>

      <div className="space-y-3">
        <p className="eyebrow">Send to one of our accounts</p>
        <RadioGroup
          value={selectedProvider ?? ""}
          onValueChange={(value) =>
            form.setValue("paymentAccountProvider", value, { shouldValidate: true })
          }
        >
          {PAYMENT_ACCOUNTS.map((account) => (
            <Label
              key={`${account.provider}-${account.accountNumber}`}
              htmlFor={`payment-account-${account.provider}`}
              className={cn(
                "flex cursor-pointer items-start gap-3 border p-4 font-normal transition-colors",
                selectedProvider === account.provider
                  ? "border-gold bg-accent"
                  : "border-border hover:border-gold/50",
              )}
            >
              <RadioGroupItem
                value={account.provider}
                id={`payment-account-${account.provider}`}
                className="mt-1"
              />
              <span>
                <span className="block font-medium">{account.provider}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {account.accountName} · {account.accountNumber}
                </span>
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <label className="block">
        <span className="eyebrow">Your name on the transfer (optional)</span>
        <Input
          className="mt-3"
          placeholder="The name that will show on your payment notification"
          {...form.register("paymentSenderName")}
        />
      </label>
    </div>
  );
}
