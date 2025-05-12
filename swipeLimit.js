
const maxLikesPerDay = 5;
const maxSkipsPerDay = 20;
const swipeDataKey ='dailySwipeData';

function initializeSwipeData(){
    const existingData = localStorage.getItem(swipeDataKey);
    const now = Date.now();

    if(!existingData){
        const data ={
            remainingLikes : maxLikesPerDay,
            remainigSkips : maxSkipsPerDay,
            resetTime : now + 24*60*6*1000
        };
        localStorage.setItem(swipeDataKey,JSON.stringify(data));
        return data;
    }
    const data = JSON.parse(existingData);
    if(now >= data.resetTime){
        data.remainingLikes = maxLikesPerDay,
        data.remainigSkips = maxSkipsPerDay,
        data.resetTime = now +24*60*60*1000;
        localStorage.setItem(swipeDataKey,JSON.stringify(data));
    }
    return data;
}

function canLike(){
    const data = initializeSwipeData();
    return data.remainingLikes >0;
}

function decrementLike(){
    const data = initializeSwipeData();
    if (data.remainingLikes >0){
        data.remainingLikes -=1;
        localStorage.setItem(swipeDataKey,JSON.stringify(data));
        return true;  
    }
    return false;
}

function canSkip(){
    const data = initializeSwipeData();
    return data.remainigSkips>0;
}
function decrementSkip(){
    const data = initializeSwipeData();
    if(data.remainigSkips >0){
        data.remainigSkips -=1;
        localStorage.setItem(swipeDataKey,JSON.stringify(data));
        return true;
    }
    return false 
}

export{canLike,decrementLike, canSkip,decrementSkip};