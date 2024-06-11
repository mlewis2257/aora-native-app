import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

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

export async function sign_In(email, password) {
  try {
    const currentSession = await getCurrentSession();
    if (currentSession) {
      console.log("Already signed in");
      await account.deleteSession(currentSession.$id);
      return currentSession;
    }

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// import Appwrite

// let client = Client()
//     .setEndpoint("https://cloud.appwrite.io/v1")
//     .setProject("666775de0003b9b9e76a")
//     .setSelfSigned(true) // For self signed certificates, only use for development
