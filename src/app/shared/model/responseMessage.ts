export interface ResponseMessage{
    userId : string,
    response : string,
    documents : String[],
    state: State,
    time : string
}
export interface State{
    code : string,
    message: string
}