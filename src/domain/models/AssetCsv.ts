import * as csv_m from "fast-csv";

export default class AssetCsv {
  constructor(public readonly csv: File) {}

  public getProcessedCSV(): Object {
    let headers = [
      "group_id",
      "name",
      "type_id",
      "growth_type_id",
      "growth_rate",
      "class_id",
      "consumption_type_id",
      "category_id",
      "manufacturer",
      "capacity",
      "capacity_unit",
      "serial_number",
      "price",
      "manufacture_date",
      "installation_date",
      "custom_fields",
    ];

    return {};
  }
}
