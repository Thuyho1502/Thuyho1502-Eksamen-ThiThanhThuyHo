import { swipeLimitUrl } from "../Authentication/AUTH.js";

const DEFAULT_LIMIT_Like = 5;

const DEFAULT_LIMIT_SKIP = 15;
const ONE_DAY = 24 * 60 * 60 * 1000;

let swipeData = null;
const userId = localStorage.getItem("user_id");

// 1. Load dữ liệu swipe từ server
export async function loadSwipeLimits() {
    try {
        const res = await axios.get(swipeLimitUrl);
        const existing = res.data.find(entry => entry.userId === userId);
        const now = new Date();

        if (existing) {
            const lastReset = new Date(existing.lastReset);
            const diff = now - lastReset;

            if (diff > ONE_DAY) {
    
                swipeData = {
                    userId,
                    remainingLikes: DEFAULT_LIMIT_Like,
                    remainingSkips: DEFAULT_LIMIT_SKIP, 
                    lastReset: now.toISOString()
                };
                await axios.put(`${swipeLimitUrl}/${existing._id}`, swipeData);
            } else {
                swipeData = existing;
            }
        } else {
            
            swipeData = {
                userId,
                remainingLikes: DEFAULT_LIMIT_Like,
                remainingSkips: DEFAULT_LIMIT_SKIP, 
                lastReset: now.toISOString()
            };
            await axios.post(swipeLimitUrl, swipeData);
        }

        localStorage.setItem(`swipeLimit_${userId}`, JSON.stringify(swipeData));
    } catch (err) {
        console.error("Failed to loading swipe limit from Crud:", err);
    }
}


export function canLike() {
    return swipeData && swipeData.remainingLikes > 0;
}
export function canSkip() {
    return swipeData && swipeData.remainingSkips > 0;
}


export async function decrementLike() {
    if (!canLike()) return;
    swipeData.remainingLikes--;
    await saveSwipeData();
}

export async function decrementSkip() {
    if (!canSkip()) return;
    swipeData.remainingSkips--;
    await saveSwipeData();
}


async function saveSwipeData() {
    try {
        const res = await axios.get(swipeLimitUrl);
        const entry = res.data.find(e => e.userId === userId);

        if (entry && entry._id) {
           
            const { _id, ...dataToSend } = swipeData;

            console.log("SwipeData sent:", dataToSend);
            console.log("PUT URL:", `${swipeLimitUrl}/${entry._id}`);

            await axios.put(`${swipeLimitUrl}/${entry._id}`, dataToSend);
        } else {
            await axios.post(swipeLimitUrl, swipeData);
        }
    } catch (err) {
        console.error("Error when saving swipe data to API:", err);
    }

    localStorage.setItem(`swipeLimit_${userId}`, JSON.stringify(swipeData));
}

