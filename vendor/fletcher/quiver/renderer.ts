import { Infer } from "superstruct";
import * as S from "./schema";

// NOTE: btoa/atob are deprecated but quiver uses them so we need browser compliant shims

export function btoa(x: string) {
  return Buffer.from(x, "latin1").toString("base64");
}

export function encode(input: string): string {
  return btoa(unescape(encodeURIComponent(input)));
}

export function serialize(input: unknown): string {
  return JSON.stringify(input, null, 2);
}

export function render(input: Infer<typeof S.Main>): string {
  return serialize(input)
  const serialized = serialize(input);
  const encoded = encode(serialized);
  return encoded;
}
