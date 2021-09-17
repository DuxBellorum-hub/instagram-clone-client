import { User } from "./user";

export interface Publication{
    id : number;
    url : string;
    date : Date;
    content: string;
    like?: number;
    user? : User;
    
}