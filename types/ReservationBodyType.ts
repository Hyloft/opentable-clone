export interface ReservationBody{
  bookerEmail: string;
  bookerPhone: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerOccation: string | null;
  bookerRequest: string | null;
}