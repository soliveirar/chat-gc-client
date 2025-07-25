import { State } from "./responseMessage";

export interface DocumentResponse{
    filename : string,
    size: number,
    state : State,
    message : string, 
    time : string   

}