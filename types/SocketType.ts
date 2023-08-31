import { Socket } from "socket.io-client";

export interface BookingTemporary {
  number_of_people: number;
  booking_time: Date;
  tables: {
    booking_id: number;
    table_id: number;
  }[];
}

export interface EmitReserveTemporary {
  booking: BookingTemporary;
  uuid: string;
}

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface ServerToClientEvents {
  [x: string]: (...args: any) => any;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  reserveTemporary: (temporaryBooking: EmitReserveTemporary) => void;
  endReservation: (uuid: string) => void;
}
