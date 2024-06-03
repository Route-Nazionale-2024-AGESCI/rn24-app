export const navigationLink = (location) => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf("android") > -1;
    if(isAndroid) {
        return `geo:${location}?q=@${location}`;
    }
    else {
        return `http://maps.apple.com/?q=${location}`;
    }
}