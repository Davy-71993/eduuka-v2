
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GeoData, Location, Message } from "./types"
import { MdElectricalServices } from "react-icons/md";
import { ComponentType } from "react";
import { LatLng } from "leaflet";
import axios from "axios";
import { SUPPORTED_CURRANCIES } from "./defaults";
import { useFilters, useSearch } from "./hooks";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toNumber = (str?: string | number) => {
  if(str?.toString().includes('.')){
    return Number.isNaN(parseFloat(str as string)) ? 0  : parseFloat(str as string)
  }
  return Number.isNaN(parseInt(str as string)) ? 0  : parseInt(str as string)
  
}

export const numberOrUndefine = (str?: string) => Number.isNaN(parseInt(str??'')) ? undefined  : parseInt(str??'') 

export const getRandomCoordinate = (min:number, max: number) => (Math.random() * (max - min) + min).toFixed(6)

export const generateCoordinates = () => ({ lat: getRandomCoordinate(-1.312141, 4), lon: getRandomCoordinate(29.627130, 40)})

export const today = new Date();

export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

export const setDate = () => new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10)))

export const prettyDistance = (dist_metters?: number) => {
  if(!dist_metters) return "Unknown distance away"
  if(dist_metters <= 800) return `${dist_metters.toFixed(2)} Meters away`
  return `${(dist_metters/1000).toFixed(2)} Kilometers away`
}

/**
 * This function takes in the requested currency, the ad defaut currency and the price 
 * of the add and returns a string representation of the requested currency and the price of the ad
 * e.g USD 450
 * @param ad_currency The default currency of the ad. this is the currency saved in the data base
 * @param currency The requested currency by the client.
 * @param price The original price of the ad in string format
 * @returns String representation of the requested currency and the price of the ad 
 */
export const displayCurrencyAndPrice = (ad_currency: string, currency: string, price: string) => {
  // console.log(ad_currency, currency, price)
  const acceptedCurrencies = ["USD", "UGX", "KSH", "TSH"]
  if(ad_currency.toUpperCase() !in acceptedCurrencies) return "Unsupported currency"
  if(currency === ad_currency) return `${currency.toUpperCase()} ${toMoney(toNumber(price).toFixed(2))}`
  const exchangeRate: any = {
    "USD": 1,
    "UGX": 3720,
    "KSH": 124,
    "TSH": 2067
  }
  if(ad_currency === "USD") return `${currency} ${toMoney((toNumber(price)*exchangeRate[currency]).toFixed(2))}`
  
  return `${currency} ${toMoney(((toNumber(price)/exchangeRate[ad_currency])*exchangeRate[currency]).toFixed(2))}`

}

/**
 * Get messages and structure then into folders, depending on the ads and other participants
 * @param messages Fetched messages for specific user
 * @param my_id The id of the specified user
 * @returns Structured messages
 */
export const organizeMessages = async(messages: Message[], my_id: string) => {
  const organized: any = {};
  
  for (const message of messages) {
    const { sender_id, ad_id, recipient_id } = message;
    // for each mesaage first identify the second party
    const other_id = sender_id === my_id ? recipient_id : sender_id
    
    // Create a folder for each ad named with it's id
    if (!organized[ad_id]) {
        organized[ad_id] = {};
    }
    
    // Inside each ad folder, create a folder for each second party
    if (!organized[ad_id][other_id]) {
        organized[ad_id][other_id] = [];
    }
    
    // Push the message a folder depending on id's ad_id and the second party id
    organized[ad_id][other_id].push(message);
  }

  // folderise the data.
  // To be optmised in a better way.
  let imagefolders = []
  for (const key in organized) {
    const image = key
    const persons = []
    for (const person in organized[key]) {
      if (Object.prototype.hasOwnProperty.call(organized[key], person)) {
        const user = person
        const messages = organized[key][person]
        persons.push({
          user,
          messages
        })
        
      }
    }
    imagefolders.push({
      image,
      persons
    })
  }
  return imagefolders;
}

export const toMoney = (money: string) => {
  const stringValue = money.toString()
  if(!numberOrUndefine(money)){
    return money
  }

  // 1. Eleiminate the decimal numbers
  const int = stringValue.split('.')[0]

  // Before the first comma
  const rem = int.length%3
  const bc = int.split('').splice(0, rem).join('')

  // After the first comma
  const div = int.split('').splice(rem, int.length).join('')

  if(!div.length){
    return money
  }
 
  // Start with a comma
  let res = ''

  if(bc.length){
    res = ','
  }
  // Insert another comma after every three digits
  let i = 3
  while (i <= div.length ) {
    res = res + div.slice(i-3, i)  + (i < div.length ? ',' : '')
    i = i+3
  }
  return bc+res
}

/**
 * Do reverse geo-coding given the coordinates
 */
export const reverseCode = async(location: Location) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}`)
    const { address, display_name } = res.data
    const locationData: GeoData = {
      ...address,
      address: display_name,
      currency: SUPPORTED_CURRANCIES[address.country_code.toUpperCase()] ?? 'USD',
      location
    }

    return locationData       
  } catch (error) {
    console.log("Failed to reverse geo-code, ", error)
    
    return 
  }
}

/**
 * Calculate geo distance between two points
 */
export const calcDistance = (point1:Location, point2: Location, unit?: string) => {
  let lat1 = point1.lat,
      lat2 = point2.lat,
      lon1 = point1.lon,
      lon2 = point2.lon

  if(!lat1 || !lat2 || !lon1 || !lon2){
    return
  }

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		let radlat1 = Math.PI * lat1/180;
		let radlat2 = Math.PI * lat2/180;
		let theta = lon1-lon2;
		let radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

/**
 * Convert the search params into an object
 */
export const toQueryString = (obj: any) => {
  // Initialize the queryString with a ?
  let queryString = '?'
  // For evey item in th updated search params object,
  // update the queryString
  for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if(obj[key]){
              queryString+=`${key}=${obj[key]}&`;
          }
      }
  }
  
  // We ensure we have removed the last character in the string
  // From the above definitions, it's either ? or &
  queryString = queryString.slice(0, queryString.length-1)

  return queryString
}


