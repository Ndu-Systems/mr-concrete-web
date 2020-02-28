export interface SupplierCount {
  Count: string;
}

export interface CategoryCount {
  Count: string;
}

export interface MeasurementCount {
  Count: string;
}

export interface SettingCounterModel {
  SupplierCount?: SupplierCount;
  CategoryCount?: CategoryCount;
  MeasurementCount?: MeasurementCount;
}
