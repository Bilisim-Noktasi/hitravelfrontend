export interface Tour {
    id: string;
    slug: string;
    name: string;
    languageCode: number;
    pricingType: number;
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
    averageRating: number;
    totalComment: string;
    departure: number;
    turnaround: number;
    note: string;
    tourPriceUSD: number;
    tourPriceTRY: number;
    tourPriceEUR: number;
    startDate: string;
    endDate: string;
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

  export interface Category {
    id: string;
    name: string;
    nameEn: string;
    sortOrder: number;
    imageUrl: string;
    categoryType: number;
    subCategories: string[];
  }

  export interface SubCategory {
    id: string;
    name: string;
    nameEn: string;
    sortOrder: number;
    categoryId: string;
    categoryName: string;
    imageUrl: string;
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
    IsExpandable: boolean;
    quantity: number;
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
    cityName: string;
    stateName: string;
    priceUSD: number;
    priceTRY: number;
    priceEUR: number;
    tourId: string;
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
    tours: Tour[];
    count: number;
}

export interface TourCategory {
  categories: Category[];
  category: Category | null;
}

export interface TourSubCategory {
  subCategories: SubCategory[];
  subCategory: SubCategory | null;
}

export interface BlogState {
  blog: Blog | null;
  blogs: Blog[]
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  categoryName: string;
  categoryType: number;
  tags: Tag[];
  slug: string;
  imageUrl: string;
  publishedDate: string;
}

export interface Tag {
  id: string;
  name: string;
}