import {initializeApp} from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';

import {
	getFirestore,doc,getDoc,setDoc
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyAg-xKs-U3RpDa-OUqVF22UlgGUDevhih4",
	authDomain: "crwn-clothing-db-5be22.firebaseapp.com",
	projectId: "crwn-clothing-db-5be22",
	storageBucket: "crwn-clothing-db-5be22.appspot.com",
	messagingSenderId: "1039007035617",
	appId: "1:1039007035617:web:8bc98d8e7bd8ac8d4e47a0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	promp: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth =  async (userAuth) => {
	const userDocRef = doc(db,'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if(!userSnapshot.exists()){
		const {displayName,email} = userAuth;
		const createdAt = new Date();

		try{
			await setDoc(userDocRef,{displayName,email,createdAt})
		}catch (error){
			console.log('error creating user',error.message)
		}
	}
		return userDocRef;
}




