export interface Tour {
    id: string;
    name: string;
    size: number;
    categoryId: string;
    categoryName: string;
    subCategoryId: string;
    subCategoryName: string;
    isPopular: boolean;
    tourDays: string;
    tourHours: number;
    countryId: string;
    countryName: string;
    cityId: string;
    cityName: string;
    stateId: string;
    stateName: string;
    longitude: number;
    latitude: number;
    overview: string;
    departure: number;
    turnaround: number;
    note: string;
    tourPriceUSD: number;
    tourPriceTRY: number;
    tourPriceEUR: number;
    languages: TourLanguage[];
    activities: TourActivity[];
    tourExtras: TourExtra[];
    questionAnswers: QuestionAnswer[];
    includedItems: TourIncludedItem[];
    excludedItems: TourExcludedItem[];
    images: TourImage[];
    tourImages?: TourImage[];
    startTimes?: TourStartTime[];
    childPrices: ChildPrice[];
    transfers: Transfer[];
  }
  
  export interface TourLanguage {
    id: string;
    name: string;
  }
  
  export interface TourActivity {
    id: string;
    name: string;
  }
  
  export interface TourExtra {
    id: string;
    name: string;
    priceUSD: number;
    priceTRY: number;
    priceEUR: number;
    tourId: string;
  }
  
  export interface QuestionAnswer {
    id: string;
    question: string;
    answer: string;
    tourId: string;
  }
  
  export interface TourIncludedItem {
    id: string;
    name: string;
  }
  
  export interface TourExcludedItem {
    id: string;
    name: string;
  }
  
  export interface TourImage {
    id: string;
    imageUrl: string;
    tourId: string;
  }
  
  export interface TourStartTime {
    id: string;
    tourId: string;
    startTime: string;
  }
  
  export interface ChildPrice {
    id: string;
    minAge: number;
    maxAge: number;
    priceUSD: number;
    priceTRY: number;
    priceEUR: number;
    tourId: string;
  }
  
  export interface Transfer {
    id: string;
    cityId: string;
    stateId: string;
    priceUSD: number;
    priceTRY: number;
    priceEUR: number;
    tourId: string;
  }
  
  export interface TourCreateRequest {
    name: string;
    size: number;
    categoryId: string;
    subCategoryId: string;
    isPopular: boolean;
    tourDays: string;
    tourHours: number;
    countryId: string;
    cityId: string;
    stateId: string;
    longitude: number;
    latitude: number;
    overview: string;
    departure: number;
    turnaround: number;
    note: string;
    tourPriceUSD: number;
    tourPriceTRY: number;
    tourPriceEUR: number;
    questionAnswers: {
      question: string;
      answer: string;
    }[];
    languages: {
      name: string;
    }[];
    activities: {
      name: string;
    }[];
    tourExtras: {
      name: string;
      priceUSD: number;
      priceTRY: number;
      priceEUR: number;
    }[];
    tourStartTimes: {
      startTime: string;
    }[];
    tourIncludedItems: {
      name: string;
    }[];
    tourExcludedItems: {
      name: string;
    }[];
    childPrices: {
      minAge: number;
      maxAge: number;
      priceUSD: number;
      priceTRY: number;
      priceEUR: number;
    }[];
    transfers: {
      cityId: string;
      stateId: string;
      priceUSD: number;
      priceTRY: number;
      priceEUR: number;
    }[];
    tourImages: {
      imageUrl: string;
    }[];
  }
  
  export interface TourUpdateRequest extends TourCreateRequest {
    id: string;
  }
  
  export interface BulkPriceUpdateRequest {
    percentageChange: number;
    fixedChange: number;
    applyToChildPrices: boolean;
    applyToTourExtras: boolean;
    applyToTransfers: boolean;
    roundToInteger: boolean;
  }
  
  export interface BulkPriceUpdateResponse {
    updatedCount: number;
  }

// export interface VillaState {
//     villas: Items[],
//     villa?: VillaDetail
// }
// export type Villa = {
//     name: string;
//     createdDate: string;
//     items: VillaItem[];
//     counts: Counts;
//     live: boolean
// }
// export type VillaItem = {
//     items: Items[]
// }
// export type Items = {
//     title: string;
//     resim: string;
//     url: string;
// }
// export type Counts = {
//     home: number;
//     type: number;
//     feature: number;
//     highlight: number;
//     room: number;
//     distance: number;
//     price: number;
//     image: number;
// }

// export type VillaDetail = {
//     language: string;
//     updateUrl: string;
//     title: string;
//     url: string;
//     latitude: number;
//     longitude: number;
//     icerik: string;
//     type: string;
//     destination: string;
//     room: number;
//     people: number;
//     bathroom: number;
//     floor: number;
//     currency: string;
//     rate: number;
//     deposit: number;
//     damageDeposit: number;
//     cleaning: number;
//     electricity: number;
//     pools: {name:string; value:string; depth:string; width:string; length:string }[];
//     types: string[],
//     features: string[],
//     highlights: string[],
//     included: string[],
//     notincluded: string[],
//     rooms: {title:string; values: { title:string; count:number; value:string }}[];
//     distances: { type:string; title:string; value:string }[];
//     prices: { startDate:string, endDate: string; price:number; minNight:number; cleaningNight:number; cleaningPrice: number }[];
//     pictures: string[]
// }

export interface TourState {
    tour: Tour | null;
    tours: Tour[]
}

// export type Tour = {
//     name: string,
//     groupSize: number;
//     slug: string;
//     tourCategory: string;
//     tourSubCategory: string,
//     overView: string;
//     highlight: string;
//     tourType: string;
//     rating: number;
//     questionAnswer: QuestionsAnswer[];
//     tourDateTime: TourDateTime;
//     tripType: TripType;
//     included: string[];
//     excluded: string[];
//     location: Location;
//     extra: TourExtra;
//     transfer: Transfer[];
//     tourPriceUSD: number
//     childPriceDto: ChildPriceDto[]
//     questions: string;
//     images: string[];
//     languages: string[];
//     id: string;
// }

// export type ChildPriceDto = {
//     minAge: number;
//     maxAge: number;
//     price: number
// }

// export type Transfer = {
//     isActive: boolean;
//     location: string;
//     price: TourPrice
// }

// export type TourPrice = {
//     code: string;
//     price: number
// }

// export type TripType = {
//     departure: string;
//     turnaround: string;
// }

// export type TourDateTime = {
//     days: string[],
//     times: string[],
//     hours: string
// }

// export type QuestionsAnswer = {
//     question: string;
//     answer: string;
// }

// export type Location = {
//     country: string;
//     city: string;
//     state: string;
//     map: Map
// }

// export type Map = {
//     lat: string;
//     lon: string;
// }

// export type TourExtra = {
//     name: boolean;
//     price: number;
// }

// export type Currency = {
//     code: string;
//     price: number
// }

// export type RequestOptions = {
//     id?: string;
//     controller: string;
//     action?: string;
//     params?: object;
//   };

// export type SearchCountry = {
//         country_id: number;
//         rewrite: string;
//         country_name: string;
// }

// export type SearchCity = {
//     cityId: number;
//     cityName: string;
// }

// export type SearchState = {
//     stateName: string
// }

// export type TourCategory = {
//     id: string;
//     mainCategoryName: string;
//     subCategories: string[];
// }