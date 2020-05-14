export const AssetCSVHeader = [
  { label: "Nama Aset", key: "name" },
  { label: "Nomor Aset", key: "serial_number" },
  { label: "Induk", key: "group[parent][parent][name]" },
  { label: "Sub Induk", key: "group[parent][name]" },
  { label: "Equipment ", key: "group[name]" },
  { label: "Jenis Part", key: "type[name]" },
  { label: "Growth/Depression Rate", key: "growth_rate" },
  { label: "Kelas Aset", key: "class[name]" },
  { label: "Konsumsi Aset", key: "consumption_type[name]" },
  { label: "Kategori", key: "category[name]" },
  { label: "Manufaktur", key: "manufacturer" },
  { label: "Kapasitas", key: "capacity" },
  { label: "Satuan Kapasitas", key: "capacity_unit" },
  { label: "Harga", key: "price" },
  { label: "Nomor Seri", key: "serial_number" },
  { label: "Tanggal Pembuatan", key: "manufacture_date" },
  { label: "Tanggal Pemasangan", key: "installation_date" }
];

export const ServisCSVHeader = [
  { label: "ID Aset", key: "id" },
  { label: "Nama Aset", key: "name" },
  { label: "Induk", key: "group[parent][parent][name]" },
  { label: "Sub Induk", key: "group[parent][name]" },
  { label: "Equipment ", key: "group[name]" },
  { label: "Nomor Seri", key: "serial_number" },
  { label: "Tgl. Mulai", key: "-" },
  { label: "Lama", key: "-" },
  { label: "Periodik", key: "-" }
];

export const ServisBacklogCSVHeader = [
  { label: "ID Aset", key: "asset[id]" },
  { label: "Nama Aset", key: "asset[name]" },
  { label: "Induk", key: "asset[group][parent][parent][name]" },
  { label: "Sub Induk", key: "asset[group][parent][name]" },
  { label: "Equipment ", key: "asset[group][name]" },
  { label: "Nomor Seri", key: "asset[serial_number]" },
  { label: "Tgl. Mulai", key: "start_date" },
  { label: "Lama", key: "asset[service_plan][long]" },
  { label: "Periodik", key: "asset[service_plan][periodic]" }
];
