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


const findInstrumentById = id => instruments.find(instrument => instrument.id === id);

const findInstrumentByTitle = title => instruments.find(instrument => {
  return instrument.title.toLowerCase() === title.toLowerCase();
});

const deleteInstrumentById = id => {
  const indexToDelete = instruments.findIndex(instrument => instrument.id === id);
  if (index !== -1) {
    instruments.splice(indexToDelete, 1);
    return true;
  }
  return false;
}

const addInstrument = instrumentData => {
  const newInstrument = {
    id: instrumentId++,
    ...instrumentData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  instruments.push(newInstrument);
  return newInstrument;
}

const updateInstrument = (id, updatedData) => {
  const indexToUpdate = instruments.findIndex(instrument => instrument.id === id);
    if (indexToUpdate === -1) {
    return null;
  }
  const updatedInstrument = {
    ...instruments[indexToUpdate],
    ...updatedData,
    updatedAt: new Date()
  };
  instruments[indexToUpdate] = updatedInstrument;
  return updatedInstrument;
}
module.exports = {
  instruments,
  findInstrumentById,
  findInstrumentByTitle,
  deleteInstrumentById,
  addInstrument,
  updateInstrument
};
