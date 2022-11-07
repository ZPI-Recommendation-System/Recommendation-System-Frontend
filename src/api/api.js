import mockData from './mockData';

export class Laptop {
    constructor(id, name, image) {
      this.id = id;
      this.name = name;
      this.image = image;
    }
  }
  
// returns ids of laptops that follow the filters 
export function getLaptopIds(filters) {
  return mockData.map(l=>l.ID);
}

export function reduceName(name){
  return name.split(" ").slice(1, 5).join(" ");
}

// get laptop class of laptop with given id 
export function getLaptop(laptopId) {
  const data = mockData.find(l=>l.ID===laptopId);
  if (data===undefined) {
    return undefined;
  }

  return new Laptop(data.ID, reduceName(data.Name), data["Zdjęcie"])
}

// get a object with laptop details, example {cpu: "pentium 2 core", gpu: "integrated"}
export function getLaptopDetails(laptopId) {
  const data = mockData.find(l=>l.ID===laptopId);
  const result = {};

  if (data===undefined) {
    return result;
  }
  
  const removedKeys = [
      "ID",
      "Name",
      "Model",
      "Typ",
      "Kod producenta",
      "Zdjęcie"
  ]

    for (const [key, value] of Object.entries(data)) {
      if (removedKeys.indexOf(key)!==-1) {
        result[key] = value;
      }
    }

    return result;
}