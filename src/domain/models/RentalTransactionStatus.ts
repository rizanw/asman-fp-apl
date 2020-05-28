
export const statusIDs = ["pending", "accept", "reject", "onhand", "returned"] as const;

type statusIDs = typeof statusIDs[number]

export const statusLabels:  Record<statusIDs, string> = {
  pending: "Menunggu konfirmasi",
  accept: "Peminjaman diterima",
  reject: "Peminjaman ditolak",
  onhand: "Aset sedang dipinjam",
  returned: "Aset telah dikembalikan"
} as const;

