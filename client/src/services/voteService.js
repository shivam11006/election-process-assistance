import { 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs, 
    serverTimestamp,
    orderBy,
    limit,
    onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Service to handle voting operations with Firestore.
 * Implements security checks and fraud detection logic.
 */
export const voteService = {
    /**
     * Cast a vote for a candidate
     * @param {string} userId - Firebase UID of the voter
     * @param {string} candidateName - Name of the selected candidate
     * @returns {Promise<string>} - The created vote ID
     */
    castVote: async (userId, candidateName) => {
        // 1. Check for duplicate voting (CRITICAL)
        const existingVoteQuery = query(
            collection(db, "votes"), 
            where("userId", "==", userId)
        );
        const existingVotes = await getDocs(existingVoteQuery);
        
        if (!existingVotes.empty) {
            throw new Error("ALREADY_VOTED: You have already cast your vote.");
        }

        // 2. AI-BASED FRAUD DETECTION (Rule-based)
        // Check for "Blast Voting" (too many votes in a short time globally)
        const recentVotesQuery = query(
            collection(db, "votes"),
            orderBy("timestamp", "desc"),
            limit(10)
        );
        const recentVotes = await getDocs(recentVotesQuery);
        
        if (recentVotes.size >= 10) {
            const now = Date.now();
            const oldestRecentVote = recentVotes.docs[recentVotes.size - 1].data().timestamp?.toMillis() || now;
            
            // If 10 votes were cast in less than 5 seconds, flag as suspicious
            if (now - oldestRecentVote < 5000) {
                console.warn("Suspicious activity detected: High frequency voting.");
                // We could log this to a separate 'alerts' collection
            }
        }

        // 3. Save the vote
        const voteData = {
            userId,
            candidateName,
            timestamp: serverTimestamp(),
            metadata: {
                userAgent: navigator.userAgent,
                platform: navigator.platform
            }
        };

        const docRef = await addDoc(collection(db, "votes"), voteData);
        return docRef.id;
    },

    /**
     * Get real-time voting results
     * @param {function} callback - Function to handle result updates
     */
    subscribeToResults: (callback) => {
        return onSnapshot(collection(db, "votes"), (snapshot) => {
            const results = {};
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const candidate = data.candidateName;
                results[candidate] = (results[candidate] || 0) + 1;
            });
            callback(results);
        });
    },

    /**
     * Check if a user has already voted
     * @param {string} userId 
     * @returns {Promise<boolean>}
     */
    hasUserVoted: async (userId) => {
        const q = query(collection(db, "votes"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }
};
