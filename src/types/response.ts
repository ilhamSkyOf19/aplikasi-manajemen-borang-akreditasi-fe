export interface ResponseStructure<T> {
  meta: {
    statusCode: number;
    message: string;
  };
  data: T;
}
