import MultiGTSPopup from './popup/multi-gts';
import GTSPopup from './popup/gts';

let utils = {
    openPopup: function(popupFile, popupData){
        switch (popupFile) {
            case "multi-gts":
                MultiGTSPopup(popupData);
                break;
            case "gts":
                    GTSPopup(popupData);
                    break;
            default:

        }
    },
    TLD: function(){
          var i,h,
            weird_cookie='weird_get_top_level_domain=cookie',
            hostname = document.location.hostname.split('.');
            for(i=hostname.length-1; i>=0; i--) {
                h = hostname.slice(i).join('.');
                document.cookie = weird_cookie + ';domain=.' + h + ';';
                if(document.cookie.indexOf(weird_cookie)>-1){
                    document.cookie = weird_cookie.split('=')[0] + '=;domain=.' + h + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                return h;
            }
        }
        return window.location.hostname;
    },
    addCookieMins: function(c_name, value, expMins) {

        let expDate,
            domain_name = this.TLD();
        if (expMins) {
            expDate = new Date();
            expDate.setTime(expDate.getTime() + (expMins * 60 * 1000));
            expDate = expDate.toUTCString();
        }
        let c_value = escape(value) + ((!expDate) ? "" : "; expires=" + expDate) + ";domain=" + domain_name + " ; path=/";

        document.cookie = c_name + '=' + c_value + ';';

        if (expMins < 0) {
            c_value = escape(value) + "; expires=" + expDate + "; path=/";
            document.cookie = c_name + '=' + c_value + ';';
        }
    },
    addCookie: function(c_name, value, expDays) {
        this.addCookieMins(c_name, value, expDays * 24 * 60);
    },
    setCookie: function(c_name, value, recentexdays) {
        this.addCookie(c_name, value, recentexdays);
    },
    getCookie: function(c_name) {
        let i, x, y, ARRcookies = document.cookie.split(";");
        let ret_val;
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                ret_val = unescape(y);
            }
        }
        return ret_val;
    },
    deleteCookie: function(c_name) {
        this.removeCookie(c_name);
    },
    removeCookie: function(c_name) {
        this.addCookie(c_name, '', -1);
    },
    isLoggedin: (function() {
        // Check Logged in cookie on First Load
        return false;
    })(),
    showToast: function(message) {
            let toastWrapper = document.createElement("div");
            toastWrapper.innerHTML = `<span>${message}</span>`;
            toastWrapper.className = "toast-wrpr";
            document.body.appendChild(toastWrapper);

            setTimeout(function(){
                toastWrapper.outerHTML = "";
            },3000);
    },
    copyText: function(text){
        let textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand("copy");
            this.showToast(`Coupon Code ${text} is copied to your clipboard`);
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally{
            document.body.removeChild(textarea);
        }
        return true;
    }
}

export default utils;
