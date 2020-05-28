

export const availabilityIDs = ["avail", "unavail"] as const;

type availabilityIDs = typeof availabilityIDs[number]

export const availabilityLabels:  Record<availabilityIDs, string> = {
  avail: "Tersedia",
  unavail: "Kosong"
} as const;