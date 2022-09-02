import { RequestHandler } from "express";

export type ArgsBody = { [key: string]: unknown };

export type ArgsQuery = { [key: string]: unknown };

export type Args = {
  body?: ArgsBody
  params?: string[],
  query?: ArgsQuery,
};

export type LegacyBody = {
  name: string,
  context?: {
    [key: string]: unknown
  }
  args: Args
  runtime: number,
  result: unknown
};

export type Experiment = {
  name: string,
  enabledPct: number,
  method: string,
  apiEndpoint: string,
  flaggedMismatchRules?: {
    name: string,
    criteria: string[],
  } 
};
export type DBBody = {
  experimentName: string,
  context: object,
  resultLegacy: string,
  resultMS: string,
  legacyTime: number,
  msTime: number,
  mismatch: boolean,
  ignoredMismatch?: boolean,
  mismatchName?: string
  createdAt: Date
}


