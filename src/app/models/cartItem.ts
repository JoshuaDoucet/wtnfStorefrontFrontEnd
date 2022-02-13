export class CartItem {
    id: number; // order_products ID
    prod_id: number; // product ID
    name: string; // Product name
    product_quantity: number;
    user_id: string;
    ord_id: number;
    status: string;

    constructor(){
        this.id = -1;
        this.prod_id = -1;
        this.name = "";
        this.product_quantity = 0;
        this.user_id = "-1";
        this.ord_id = -1;
        this.status = "active";
    }

}