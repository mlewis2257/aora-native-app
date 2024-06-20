import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mlew22.aora",
  projectId: "666775de0003b9b9e76a",
  databaseId: "6667785e002a6ed41844",
  usersCollectionId: "666778a70026ed82b3f1",
  videosId: "666778e1001a96a3816e",
  storageId: "66677bcd00166b1fd4af",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

// Client requests
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarsUrl = avatars.getInitials(username);
    await sign_In(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarsUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get current session
export const getCurrentSession = async () => {
  try {
    const currentSession = await account.get();
    return currentSession;
  } catch (error) {
    return null;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [
        Query.equal("accountId", currentAccount.$id),
        Query.equal("email", currentAccount.email),
      ]
    );
    if (currentUser.total === 0) throw Error("User not found");
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const sign_In = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosId
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosId,
      [Query.search("title", query) || Query.search("description", query)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// export async function sign_Out() {
//   try {
//     const currentSession = await getCurrentSession();
//     if (currentSession) {
//       await account.deleteSession(currentSession.$id);
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }

// import Appwrite

// let client = Client()
//     .setEndpoint("https://cloud.appwrite.io/v1")
//     .setProject("666775de0003b9b9e76a")
//     .setSelfSigned(true) // For self signed certificates, only use for development
