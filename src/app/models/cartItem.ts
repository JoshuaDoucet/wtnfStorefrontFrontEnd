export class CartItem {
    id: number; // order_products ID
    product_id: number; // product ID
    name: string; // Product name
    product_quantity: number;
    price: number;
    user_id: string;
    ord_id: number;
    status: string;

    constructor(){
        this.id = -1;
        this.product_id = -1;
        this.name = "";
        this.price = 0;
        this.product_quantity = 0;
        this.user_id = "-1";
        this.ord_id = -1;
        this.status = "active";
    }

}