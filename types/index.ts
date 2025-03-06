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

export interface VillaState {
    villas: Villa[],
    villa?: VillaDetail
}

export interface Villa {
    title: string;
    imageUrl: string;
    detailUrl: string;
    liveUrl: string;
    homeId: string;
}

export interface VillaDetail {
    id: string;
    title: string;
    url: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    type: string;
    destination: string;
    room: number;
    bedroom: number;
    bathroom: number;
    floor: number;
    capacity: number;
    currency: string;
    deposit: number;
    damageDeposit: number;
    checkInTime: string;
    checkOutTime: string;
    heating: string;
    klima: number;
    ribbon1: string;
    ribbon2: string;
    features: string[];
    types: string[];
    highlights: string[];
    included: string[];
    notIncluded: string[];
    pools: VillaPool[];
    rooms: VillaRoom[];
    distances: VillaDistance[];
    prices: VillaPrice[];
    images: string[];
    pictures: string[];
    icerik: string;
    people: number;
    latitude: number;
    longitude: number;
    lastContentUpdate: string;
    lastPricesUpdate: string;
}

export interface VillaPool {
    name: string;
    value: string;
    depth: string;
    width: string;
    length: string;
}

export interface VillaRoom {
    title: string;
    items: VillaRoomItem[];
}

export interface VillaRoomItem {
    title: string;
    count: number;
    value: string;
}

export interface VillaDistance {
    type: string;
    title: string;
    value: string;
}

export interface VillaPrice {
    startDate: string;
    endDate: string;
    price: number;
    minNight: number;
    cleaningNight: number;
    cleaningPrice: number;
    heating: number;
}

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