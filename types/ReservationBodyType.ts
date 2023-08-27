export interface ReservationBody{
  bookerEmail: string;
  bookerPhone: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerOccasion: string | null;
  bookerRequest: string | null;
}