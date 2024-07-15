// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsbk2pfqZ0SddKiXdYi6sTH8NC0f2L7bQ",
    authDomain: "crown-clothing-b53ff.firebaseapp.com",
    projectId: "crown-clothing-b53ff",
    storageBucket: "crown-clothing-b53ff.appspot.com",
    messagingSenderId: "1049656970004",
    appId: "1:1049656970004:web:4e2ab4f7a85646706f5001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
        const newDocRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const categoriesSnapshot = await getDocs(collectionRef);
    const categories = categoriesSnapshot.docs.map((doc) => doc.data());


    return categories;
}

export const getUserDocumentFromAuth = async (uid) => {
    if (!uid) {
        console.log("A user ID is required to get a user document");
        return null;
    }

    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);

    if (userSnapShot.exists()) {
        return userSnapShot.data();
    } else {
        console.log("User document does not exist");
    }
}

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        console.log("Email and password are required");
        return;
    }

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        return user;
    } catch (error) {
        if (error.code == "auth/email-already-in-use") {
            alert("Cannot create user, email already in use!");
        }
        console.log("Error creating user", error.message);
    }
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        console.log("Email and password are required");
        return;
    }

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        return user;
    } catch (error) {
        switch (error.code) {
            case "auth/invalid-credential":
                alert("incorrect password for email");
                break;
            case "auth/user-not-found":
                alert("no user associated with this email");
                break;
            default:
                console.log("Error signing in user", error.message);
        }
    }
}


export const signOutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log("Error signing out user", error.message);
    }
}

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}