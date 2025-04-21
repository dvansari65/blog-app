import { Client, ID, Databases, Storage, Query } from "appwrite";
import Conf from "../Conf/Conf"; // ✅ correctly import your config file

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(Conf.appWrite_URL)
            .setProject(Conf.appWrite_ProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                Conf.appWrite_DatabaseId,
                Conf.appWrite_CollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                Conf.appWrite_DatabaseId,
                Conf.appWrite_CollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                Conf.appWrite_DatabaseId,
                Conf.appWrite_CollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                Conf.appWrite_DatabaseId,
                Conf.appWrite_CollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                Conf.appWrite_DatabaseId,
                Conf.appWrite_CollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                Conf.appWrite_BucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                Conf.appWrite_BucketId,
                fileId // ✅ only pass bucket ID and file ID
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    filePreview(fileId) {
        return this.storage.getFilePreview(Conf.appWrite_BucketId, fileId);
    }
}

// ✅ export instance to use across your app
const service = new Service();
export default service;
