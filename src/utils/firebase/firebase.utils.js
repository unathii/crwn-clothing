import {initializeApp} from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyAg-xKs-U3RpDa-OUqVF22UlgGUDevhih4",
	authDomain: "crwn-clothing-db-5be22.firebaseapp.com",
	projectId: "crwn-clothing-db-5be22",
	storageBucket: "crwn-clothing-db-5be22.appspot.com",
	messagingSenderId: "1039007035617",
	appId: "1:1039007035617:web:8bc98d8e7bd8ac8d4e47a0"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
	console.log(userDocRef);
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
}




