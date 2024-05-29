import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DataBaseAuth {
    clinet = new Client();
    database;
    bucket;
    constructor() {
        this.clinet.setEndpoint(import.meta.env.VITE_APPWRITE_URL).setProject(import.meta.env.VITE_APPWRITE_APPLICATION_ID);
        this.database = new Databases(this.clinet);
        this.bucket = new Storage(this.clinet);
    }

    async createPost({ Title, slug, userId, BlogContent, PublishDate, thumbnail_Image, ImagesInBlog, isPublish,userName }) {
        try {
            return await this.database.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    Title, userId, BlogContent, PublishDate, thumbnail_Image, ImagesInBlog, isPublish,userName
                }
            )
        } catch (error) {
            throw error;
        }

    }

    async updatePost(slug, { Title, BlogContent, thumbnail_Image, ImagesInBlog, isPublish }) {
        try {
            return await this.database.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    Title, BlogContent, thumbnail_Image, ImagesInBlog, isPublish
                }

            )
        } catch (error) {
            throw error
        }
    }

    async deletPost(slug) {
        try {
            await this.database.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,

            )
            return true
        } catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {
           const res=await this.database.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,
            )
            return res;
            
        } catch (error) {
            console.log(`Document not found ${error}`);
            return false;
        }
    }

    async getPosts(query = [Query.equal("isPublish", true)]) {
        try {
            return await this.database.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                query,
            )
        } catch (error) {
            console.log("no Document is pubished or not active at this moment");
            return false
        }
    }

    async uploadFile(file) {
        try {
            if (!file) {
                console.log("enter a valid file");
                return false;
            }
            return await this.bucket.createFile(
                import.meta.env.VITE_APPWRITE_STROAGE_ID,
                ID.unique(),
                file,
                console.log(file)
            )
        } catch (error) {
            console.log(`file not upload${error}`);
            return false;
        }
    }

    async deletFile(fileID) {
        try {
            await this.bucket.deleteFile(
                import.meta.env.VITE_APPWRITE_STROAGE_ID,
                fileID
            )
            return true
        } catch (error) {
            throw error;
        }
    }

    async getFilePreview(fileID) {
        try {
            return this.bucket.getFilePreview(
                import.meta.env.VITE_APPWRITE_STROAGE_ID,
                fileID
            )
        } catch (error) {
            throw error;
        }
    }
}

const DataBaseService = new DataBaseAuth();
export default DataBaseService;