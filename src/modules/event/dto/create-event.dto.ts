export type EventType = "deposit" | "withdraw" | "transfer";

export class CreateEventDto {
  type: EventType;
  origin?: string;
  destination?: string;
  amount: number;
}
