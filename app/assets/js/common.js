// Common Functions here - Use Vanilla JS Code

function windowLogin(loginType, queryParams) {
    let pageURL = "https://m.mysmartprice.com/users/";

    if (loginType == "signup") {
        pageURL = "https://m.mysmartprice.com/users/signup.php";
    } else if (loginType == "login") {
        pageURL = "https://m.mysmartprice.com/users/login.php";
    }
    window.location.href = (pageURL + queryParams);
}

/* Event Handlers */

document.addEventListener('click', function(event) {
    let element = event.target;
    if (element.className.split(" ").indexOf("js-lgn") > -1) {
        let loginType = element.getAttribute("data-page"),
            windowParams = "?desturl=" + encodeURIComponent(window.location.href);

        windowLogin(loginType, windowParams);
    }
});

/* Event Handlers Ends */
