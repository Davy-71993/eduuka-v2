import React, { useEffect, useState } from "react";

export const useSearchQuery = (query?: any, searchParams?: any) => {
    const [queryString, setQuryString] = useState('')
    let obj = new Object()
    for (const [key, value] of searchParams) {
        obj = {...obj, [key]: value}
    }

    useEffect(()=>{
        const jointObj = {...obj, ...query}
        let str = '?'
        for (const key in jointObj) {
            if (Object.prototype.hasOwnProperty.call(jointObj, key)) {
                if(jointObj[key]){
                    str+=`${key}=${jointObj[key]}&`;
                }
            }
        }
        str = str.slice(0, str.length-1)
        
        setQuryString(str)
    }, [query, searchParams])
    return queryString
}