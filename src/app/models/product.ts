
// Product type
export class Product {
    id?: string;
    name: string;
    price: number;
    cost?: number;
    boh?: number; // balance on hand
    for_sale: boolean;
    category?: string;
    description?: string;
    measurments?: string;
    owner?: string;
    sku?: string;
    size_family?: string;
    size?: string;
    brand?: string;
    condition?: string;
    instructions?: string;
    country_origin?: string;
    rn_num?: string;
    weight_grams?: number;
    location_id?: string; // locationID
    color_ids?: string[]; // colorID array
    material_ids?: string[]; // materialsID array
    image_ids?: string[]; // imageID array

    constructor(){
        this.name = "";
        this.price = -1;
        this.for_sale = false;
    }
  };
  
  // Product type for updating
  // Similar to Product but with optional fields for updating Product row
  // id is required
  export type ProductUpdate = {
    id: string;
    name?: string;
    price?: number;
    cost?: number;
    boh?: number;
    for_sale?: boolean;
    category?: string;
    description?: string;
    measurments?: string;
    owner?: string;
    sku?: string;
    size_family?: string;
    size?: string;
    brand?: string;
    condition?: string;
    instructions?: string;
    country_origin?: string;
    rn_num?: string;
    weight_grams?: number;
    location_id?: string;
  };