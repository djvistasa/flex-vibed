export type IAmenity = {
  id: number;
  name: string;
};

export type IAmenitiesApiResponse = {
  status: string;
  result: IAmenity[];
};
