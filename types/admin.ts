import { Tour } from ".";

export interface Admin {
    tours: Tour[];
    tour: Tour | null;
}

