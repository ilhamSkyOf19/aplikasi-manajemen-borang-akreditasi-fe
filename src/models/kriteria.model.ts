// kriteria model
export interface IKriteria {
  id: number;
  kriteria: number;
  namaKriteria: string;
  revisi: number;
  createdAt: Date;
  updatedAt: Date;
}

// create kriteria model
export interface CreateKriteriaType extends Omit<
  IKriteria,
  "id" | "createdAt" | "updatedAt" | "revisi"
> {}

// updatfe kriteria model
export interface UpdateKriteriaType extends Partial<
  Omit<IKriteria, "id" | "createdAt" | "updatedAt" | "revisi">
> {}

// response kriteria model
export interface ResponseKriteriaType extends Omit<IKriteria, "kriteria"> {
  kriteria: number;
}

// ro response
export const toKriteriaResponse = (
  kriteria: ResponseKriteriaType,
): ResponseKriteriaType => kriteria;

// response kriteria model with meta
export interface ResponseKriteriaWithMetaType {
  meta: {
    totalData: number;
    currentPage: number;
    totalPage: number;
    limit: number;
  };
  data: IKriteria[];
}
