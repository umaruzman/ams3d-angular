export class User{
    id:number;
    status:number;

    first_name:string;
    last_name:string;
    email:string;
    token:string;

    role:string;

    constructor(data:any){
        this.id = data?.id;
        this.first_name = data?.first_name;
        this.last_name = data?.last_name;
        this.email = data?.email;
        this.token = data?.token;
        this.status = data?.status;
        this.role = data?.role;
    }

    getFullName(){
        return `${this.first_name} ${this.last_name}`;
    }


    toJSON() {
        return JSON.stringify(this);
    }
}