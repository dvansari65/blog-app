import Conf from "../Conf/Conf"
import { Client, Account, ID } from "appwrite";



export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(Conf.appWrite_URL)
        .setProject(Conf.appWrite_ProjectId)
        this.account=new Account(this.client)
    }
    
    async createAccount({ email,password,name}){
            try {
                const userAccount = await this.account.create(ID.unique(),email,password,name)
                if(userAccount){
                    return this.logIn({email,password})
                }else{
                    return userAccount;
                }
            } catch (error) {
                throw error;
            }
    }

    async logIn({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
     
    }
    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}


const authService=new AuthService()
export default authService;


