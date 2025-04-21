const Conf = {
    appWrite_URL: String(import.meta.env.VITE_APPWRITE_URL),
    appWrite_ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWrite_CollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWrite_DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWrite_BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default Conf;
