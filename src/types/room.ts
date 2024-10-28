export interface RoomUsers {
  name: string;
  index: string;
}

export interface Room {
  roomId: string;
  roomUsers: RoomUsers[];
}
