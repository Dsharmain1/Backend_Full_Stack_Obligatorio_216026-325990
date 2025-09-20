let instrumentId = 1;
let userId = 1;


const users = [
  { 
    id: userId++, 
    username: "User1", 
    email: "maria.rios@demo.mail",
    password: "password1"
  },
  { 
    id: userId++, 
    username: "User2", 
    email: "tomas.suarez@correo.test",
    password: "password2"
  },
  { 
    id: userId++, 
    username: "User3", 
    email: "agustin.perdomo@mail.fake",
    password: "password3"
  },
  { 
    id: userId++,
     username: "User4",
      email: "carla.martinez@ficticio.org",
      password: "password4"
  },
  { 
    id: userId++, 
    username: "User5",
    email: "ricardo.fernandez@correo.demo" ,
    password: "password5"
  },
  { 
    id: userId++, 
    username: "User6", 
    email: "sofia.lopez@dominio.prueba",
    password: "password6"
  },
  { id: userId++, 
    username: "User7", 
    email: "daniel.pereira@mail.fake",
    password: "password7"
  },
  {
    id: userId++, 
    username: "User8", 
    email: "valentina.gomez@test.org",
    password: "password8"
  }
];

const instruments = [
  {
    id: instrumentId++,
    title: "Guitar",
    description: "Guitarra acústica de madera de alta calidad",
    price: 15000,
    category: "String",
    condition: "new",
    ownerId: 1,
    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-01-10T10:00:00Z")
  },
  {
    id: instrumentId++,
    title: "Piano",
    description: "Piano de cola",
    price: 120000,
    category: "Keyboard",
    condition: "used",
    ownerId: 2,
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
    ownerId: 3,
    createdAt: new Date("2025-03-01T09:00:00Z"),
    updatedAt: new Date("2025-03-01T09:00:00Z")
  },
  {
    id: instrumentId++,
    title: "Violin",
    description: "Violín clásico de estudio",
    price: 18000,
    category: "String",
    condition: "used",
    ownerId: 4,
    createdAt: new Date("2025-03-20T11:00:00Z"),
    updatedAt: new Date("2025-03-20T11:00:00Z")
  },
  {
    id: instrumentId++,
    title: "Saxophone",
    description: "Saxofón alto en perfecto estado",
    price: 35000,
    category: "Wind",
    condition: "new",
    ownerId: 5,
    createdAt: new Date("2025-04-05T15:00:00Z"),
    updatedAt: new Date("2025-04-05T15:00:00Z")
  },
  {
    id: instrumentId++,
    title: "Trumpet",
    description: "Trompeta dorada para principiantes",
    price: 12000,
    category: "Brass",
    condition: "used",
    ownerId: 6,
    createdAt: new Date("2025-04-15T09:30:00Z"),
    updatedAt: new Date("2025-04-15T09:30:00Z")
  },
  {
    id: instrumentId++,
    title: "Flute",
    description: "Flauta traversa de plata",
    price: 10000,
    category: "Wind",
    condition: "new",
    ownerId: 7,
    createdAt: new Date("2025-05-01T08:00:00Z"),
    updatedAt: new Date("2025-05-01T08:00:00Z")
  },
  {
    id: instrumentId++,
    title: "Electric Guitar",
    description: "Guitarra eléctrica color rojo con amplificador incluido",
    price: 45000,
    category: "String",
    condition: "new",
    ownerId: 8,
    createdAt: new Date("2025-05-20T19:45:00Z"),
    updatedAt: new Date("2025-05-20T19:45:00Z")
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

// ==== Usuarios ====

const findUserById = id => users.find(user => user.id === id);

const findUserByUsername = username => {
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
};

const deleteUserById = id => {
  const indexToDelete = users.findIndex(user => user.id === id);
  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
    return true;
  }
  return false;
};

const addUser = userData => {
  const newUser = {
    id: userId++,
    ...userData
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, updatedData) => {
  const indexToUpdate = users.findIndex(user => user.id === id);
  if (indexToUpdate === -1) {
    return null;
  }
  const updatedUser = {
    ...users[indexToUpdate],
    ...updatedData
  };
  users[indexToUpdate] = updatedUser;
  return updatedUser;
};

module.exports = {
  instruments,
  findInstrumentById,
  findInstrumentByTitle,
  deleteInstrumentById,
  addInstrument,
  updateInstrument,
  findUserById,
  findUserByUsername,
  deleteUserById,
  addUser,
  updateUser  
};
