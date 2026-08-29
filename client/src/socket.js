import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;

let origin;

try {
  origin = apiUrl
    ? new URL(apiUrl).origin
    : window.location.origin;
} catch {
  origin = window.location.origin;
}

export const socket = io(origin, {
  transports: ["websocket"],
});