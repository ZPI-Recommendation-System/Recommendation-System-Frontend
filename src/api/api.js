import mockData from './mockData';
import { useEffect, useState, useRef } from 'react';

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


export function useRequest(url, options) {
  const inProgress = useRef({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    const current = JSON.stringify({url:url, options});
    if (inProgress.current === current) {
      return;
    }
    inProgress.current = current;

    if (!url) {
      setIsLoaded(true);
      setData(null);
      return;
    }
    fetch(url, options)
      .then(res =>{
          if (!res.ok) {
            // make the promise be rejected if we didn't get a 2xx response
            throw new Error(`${res.status}: ${res.statusText}`, {cause: res});
          } else {
            return res.json()
          }
        })
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [options, url])

  return [isLoaded, data, error]
}

export const API_URL = ""