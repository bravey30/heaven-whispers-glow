import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { skinTypes, pregnancyStatuses, type BookingInput } from "@/lib/booking-schema";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <p className="eyebrow mb-6">{title}</p>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function ConsultationStep({ form }: { form: UseFormReturn<BookingInput> }) {
  return (
    <Form {...form}>
      <div className="space-y-10">
        <Section title="Client Details">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Jina kamili" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Namba ya simu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="For your confirmation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="max-w-[160px]">
                <FormLabel>Age (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={120}
                    placeholder="Umri"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section title="Skin Profile">
          <FormField
            control={form.control}
            name="skinType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skin type (optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Aina ya ngozi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {skinTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainConcern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your main skin concern?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. acne, dark spots, dryness, aging, dullness"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skinGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your skin goals? (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Malengo yako ya ngozi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skincare products you currently use at home (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Cleanser, moisturizer, serum, sunscreen…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastFacialDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When was your last facial treatment? (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2 months ago" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section title="Health & Safety">
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any allergies or skin reactions to products? (optional)
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentMedication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you currently on any skin medication or treatment, e.g. Accutane, retinoids?
                  (optional)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pregnancyStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you pregnant or breastfeeding? (optional)</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    className="flex gap-6"
                  >
                    {pregnancyStatuses.map((status) => (
                      <div key={status} className="flex items-center gap-2">
                        <RadioGroupItem value={status} id={`pregnancy-${status}`} />
                        <Label htmlFor={`pregnancy-${status}`} className="capitalize">
                          {status.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section title="Anything else?">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Anything we should know…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>
      </div>
    </Form>
  );
}
