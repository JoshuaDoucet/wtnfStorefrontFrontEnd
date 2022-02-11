export class User {
    id?: string;
    first_name: string;
    last_name: string;
    password?: string;
    password_hash?: string;
    phone?: number;
    email: string;
    location_id?: string;

    constructor(){
      this.first_name = "Unknown",
      this.last_name = "Unknown",
      this.email = "unknown@email.com",
      this.password = "unknown"
    }
};
  