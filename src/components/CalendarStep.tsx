interface CalendarStepProps {
  number: number;
  title: string;
  description: string;
}

export function CalendarStep({
  number,
  title,
  description,
}: CalendarStepProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-primary text-sm font-medium">{number}</span>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
