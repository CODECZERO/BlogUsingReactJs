import { Client, ID, Account } from "appwrite";

export class AuthService {
    client = new Client;
    account;

    constructor() {
        this.client.setEndpoint(import.meta.env.VITE_APPWRITE_URL).setProject(import.meta.env.VITE_APPWRITE_APPLICATION_ID);
        this.account = new Account(this.client);
    }

    async CreateAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password })
            }
            else {
                return userAccount;
            }

        } catch (error) {
            throw error?.message
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();
export default authService;