export type GenericTableColumnType<T, K extends keyof T> = {
  key: K;
  label: string;
  style?: React.CSSProperties;
  component?: (row: T) => JSX.Element;
  sorting?: boolean;
};

export enum Order {
  ASC = "asc",
  DESC = "desc",
}
