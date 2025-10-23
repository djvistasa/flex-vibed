export interface UtilityFunction {
  id: string;
  name: string;
}

export type UtilityType = "string" | "number" | "boolean" | "object";

export type IApiResponse = {
  ok: boolean;
  result: unknown;
  error: unknown;
};
