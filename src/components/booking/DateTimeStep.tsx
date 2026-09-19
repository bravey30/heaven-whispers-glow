import { useQuery } from "@tanstack/react-query";
import { addDays, format, isBefore, isSameDay, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { BUSINESS_HOURS, CLOSED_WEEKDAY, generateTimeSlots } from "@/lib/booking-schema";
import { getBookedSlotsForDate } from "@/lib/appointments.server";
import { cn } from "@/lib/utils";

const MAX_BOOKING_WINDOW_DAYS = 60;

export function DateTimeStep({
  date,
  time,
  onChangeDate,
  onChangeTime,
}: {
  date: Date | undefined;
  time: string | null;
  onChangeDate: (date: Date | undefined) => void;
  onChangeTime: (time: string) => void;
}) {
  const dateKey = date ? format(date, "yyyy-MM-dd") : undefined;

  const { data: bookedSlots = [], isFetching } = useQuery({
    queryKey: ["booked-slots", dateKey],
    queryFn: () => getBookedSlotsForDate({ data: { date: dateKey! } }),
    enabled: !!dateKey,
  });

  const today = startOfDay(new Date());
  const maxDate = addDays(today, MAX_BOOKING_WINDOW_DAYS);
  const slots = generateTimeSlots();

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <p className="eyebrow mb-4">Choose a date</p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => {
            onChangeDate(selected);
            onChangeTime("");
          }}
          disabled={(d) => isBefore(d, today) || d > maxDate || d.getDay() === CLOSED_WEEKDAY}
          className="border border-border p-4"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Open Mon–Sat, {BUSINESS_HOURS.openHour}:00–{BUSINESS_HOURS.closeHour}:00.
        </p>
      </div>

      <div>
        <p className="eyebrow mb-4">Choose a time</p>
        {!date && (
          <p className="text-sm text-muted-foreground">Pick a date to see available times.</p>
        )}
        {date && (
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => {
              const slotDateTime = new Date(`${dateKey}T${slot}:00`);
              const isPast = isSameDay(date, today) && isBefore(slotDateTime, new Date());
              const isTaken = bookedSlots.includes(slot);
              const disabled = isPast || isTaken;
              const selected = time === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChangeTime(slot)}
                  className={cn(
                    "border px-3 py-3 text-sm transition-colors",
                    disabled &&
                      "cursor-not-allowed border-border text-muted-foreground/40 line-through",
                    !disabled && selected && "border-gold bg-gold text-gold-foreground",
                    !disabled && !selected && "border-border hover:border-gold/50",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}
        {isFetching && <p className="mt-3 text-xs text-muted-foreground">Checking availability…</p>}
      </div>
    </div>
  );
}
