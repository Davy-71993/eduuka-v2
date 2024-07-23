
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message } from "./types"
import { getAdImage, getUsername } from "./actions/db_actions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toNumber = (str?: string) => Number.isNaN(parseInt(str??'')) ? 0  : parseInt(str??'')

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
  if(currency === ad_currency) return `${currency.toUpperCase()} ${price}`
  const exchangeRate: any = {
    "USD": 1,
    "UGX": 3720,
    "KSH": 124,
    "TSH": 2067
  }
  if(ad_currency === "USD") return `${currency} ${toNumber(price)*exchangeRate[currency]}`
  
  return `${currency} ${(toNumber(price)/exchangeRate[ad_currency])*exchangeRate[currency]}`

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