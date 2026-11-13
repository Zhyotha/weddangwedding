import { createStart } from "@tanstack/react-start";

// The Base44 request middleware was designed for Base44's managed hosting,
// which injects platform-specific headers. The cPanel Node deployment uses
// the public Base44 SDK from the browser instead, so no request middleware
// is required here.
export const startInstance = createStart(() => ({}));
