import { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Get additional user data from Firestore
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                const userData = userDoc.exists() ? userDoc.data() : {};
                
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    ...userData
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = useCallback(async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    }, []);

    const register = useCallback(async (name, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update Firebase profile
        await updateProfile(result.user, { displayName: name });
        
        // Create user profile in Firestore
        const userData = {
            uid: result.user.uid,
            name,
            email,
            createdAt: new Date().toISOString(),
            role: 'voter'
        };
        
        await setDoc(doc(db, "users", result.user.uid), userData);
        
        return result.user;
    }, []);

    const logout = useCallback(async () => {
        await signOut(auth);
    }, []);

    const value = useMemo(() => ({ 
        user, 
        loading, 
        login, 
        register, 
        logout 
    }), [user, loading, login, register, logout]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


