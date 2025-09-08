let instrumentId = 1;

const instruments = [
  {
    id: instrumentId++,
    title: "Guitar",
    description: "Guitarra acústica de madera de alta calidad",
    price: 15000,
    category: "String",
    condition: "new",
    owner: "User1",
    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-01-10T10:00:00Z")
  },
  {
    id: instrumentId++,
    title: "Piano",
    description: "Piano de cola usado, en buen estado",
    price: 120000,
    category: "Keyboard",
    condition: "used",
    owner: "User2",
    createdAt: new Date("2025-02-15T14:30:00Z"),
    updatedAt: new Date("2025-02-15T14:30:00Z")
  },
  {
    id: instrumentId++,
    title: "Drums",
    description: "Batería completa para principiantes",
    price: 20000,
    category: "Percussion",
    condition: "new",
    owner: "User3",
    createdAt: new Date("2025-03-01T09:00:00Z"),
    updatedAt: new Date("2025-03-01T09:00:00Z")
  }
];
