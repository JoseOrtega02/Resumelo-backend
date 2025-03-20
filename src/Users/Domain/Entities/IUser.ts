export interface IUser{
    getEmail():string
    getName():string
    getId():string
    getCreationDate():string

    setEmail(newEmail:string):void
    setName(newName:string):void
}