//Main Controller
var mainController = (function () {

    //Edit Classnames here if any changed in html file
    var stringContainer = {
        themeVal: '.themeVal',
        grid_box: '.grid-box',
        userinfo: '.userinfo',
        grid_box_main: '.grid-box_main',
        loremTXT: '.loremTXT',
        searchbox_selector: '.searchbox_selector',
        imageload: '.imageload',
        downloadbtn: '.downloadbtn',
        search_content: '.search_content',
        searchbox_go: '.searchbox_go',
        ipAddress_main: '.ipAddress_main',
        search_content: '.search_content',
        imageload: '.imageload',
        themeVal: '.themeVal',
        switchbtn: '.switchbtn',
        header_themeswitch: '.header_themeswitch',
        footer_a_ele: '.footer_a_ele'

    };

    var sourcesContainer = {
        downloadbtnSVG: "resources/svg/ios-download.svg"
    };

    return {
        stringpass: function () {
            return stringContainer;
        },
        sourcespass: function () {
            return sourcesContainer;
        }
    };
})();




//Fetched Image + Data Controller
var image_controller = (function (mainCtrl, themeCtrl) {

    var strings = mainCtrl.stringpass();
    var sources = mainCtrl.sourcespass();

    //Instagram
    async function apiInsta(user) {

        //Fetching ID
        const fetchInsta = await fetch(`https://www.instagram.com/${user}/?__a=1`);
        const fetchInstajson = await fetchInsta.json();
        const ID = fetchInstajson.graphql.user.id;
        console.log(ID);

        //Fetching URL of Insta DP
        const userInsta = await fetch(`https://i.instagram.com/api/v1/users/${ID}/info/`);
        const userInstajson = await userInsta.json();
        const userInstaURL = userInstajson.user.hd_profile_pic_url_info.url;
        console.log(userInstaURL);

        //Fetch User Data
        const userInstausername = 'Username: ' + `<b style="font-family: 'Roboto Mono', monospace;">${userInstajson.user.username}</b>`;
        const userInstafullname = 'Full Name: ' + `<b>${userInstajson.user.full_name}</b>`;
        const userInstabio = 'Biography: ' + `<b style="font-family: 'Ubuntu', sans-serif;">${userInstajson.user.biography}</b>`;
        const userInstafollowing = 'Following: ' + `<b>${userInstajson.user.following_count}</b>`;
        const userInstafollowers = 'Followers: ' + `<b>${userInstajson.user.follower_count}</b>`;
        const userInstaID = 'Page ID: ' + `<b>${ID}</b>`;
        const userInstamedia = 'Posts: ' + `<b>${userInstajson.user.media_count}</b>`;
        var privacyTXT;
        if (userInstajson.user.is_private == true) {
            privacyTXT = 'PRIVATE'
        } else {
            privacyTXT = 'PUBLIC'
        }
        const userInstaprivacy = 'Account Privacy: ' + `<b>${privacyTXT}</b>`; //True for private

        //User Info Insertion into HTML
        var infoInsert = `<div class="userinfo"><div class="userinfo__user-name">${userInstausername}</div><div class="userinfo__full-name">${userInstafullname}</div><div class="userinfo__biography">${userInstabio}</div><div class="userinfo__followers">${userInstafollowers}</div><div class="userinfo__following">${userInstafollowing}</div><div class="userinfo__ID">${userInstaID}</div><div class="userinfo__acc-privacy">${userInstaprivacy}</div><div class="userinfo__media-upload">${userInstamedia}</div></div>`;
        document.querySelector(strings.imageload).insertAdjacentHTML('afterbegin', infoInsert);

        //Image Insertion into HTML
        var imageInsert = `<img src="${userInstaURL}" class="fetchedIMG blur-border-around">`;
        document.querySelector(strings.imageload).insertAdjacentHTML('beforeend', imageInsert);

        //Download Button Insertion into HTML
        var downloadbtnInsert = `<a class="downloadbtn_container blue-background-light large-padding" href=${userInstaURL} target="_blank" download="${userInstaURL}"><div class="downloadSVG"><img src=${sources.downloadbtnSVG} class="downloadSVG_main"></div>&nbsp;<div class="downloadTXT">OPEN</div></a>`;
        document.querySelector(strings.downloadbtn).insertAdjacentHTML('beforeend', downloadbtnInsert);


    }


    //Removing Previous Image + Data + Download button
    var removePrev = function () {
        var inforemove = document.querySelector('.userinfo');
        var imageremove = document.querySelector('.fetchedIMG');
        var downloadbtnremove = document.querySelector('.downloadbtn_container')
        inforemove.parentNode.removeChild(inforemove);
        imageremove.parentNode.removeChild(imageremove);
        downloadbtnremove.parentNode.removeChild(downloadbtnremove);

    }

    return {
        imgfuncpass: function () {
            var platform = document.querySelector(strings.searchbox_selector).getAttribute('value');
            var loadValue = document.querySelector(strings.imageload).getAttribute('value');

            if (loadValue == 1) {
                console.log(loadValue);
                removePrev();
            }

            //Sets imageLoad to 1

            if (platform == "Insta") {
                var username = document.querySelector(strings.search_content).value;
                apiInsta(username);
                document.querySelector(strings.imageload).setAttribute('value', 1);

                //Error Handling
                window.onerror = function () {
                    document.querySelector(strings.imageload).setAttribute('value', 0);
                }
            }
        }
    };
})(mainController, themeController);




//IP address controller
var ipcontroller = (function (mainCtrl) {

    var strings = mainCtrl.stringpass();

    // ' ip ' is the IP address
    async function IPfetch() {
        //Fetching IP
        const fetchIP = await fetch(`https://api.ipify.org/?format=json`);
        const fetchIPjson = await fetchIP.json();
        const ip = fetchIPjson.ip;
        console.log(ip);

        document.querySelector(strings.ipAddress_main).textContent = ip;
    }

    return {
        ipfuncpass: function () {
            IPfetch();
            //Error Handling
            window.onerror = function () {
                document.querySelector(strings.ipAddress_main).textContent = 'Error...Please Reload';
            }
        }
    };

})(mainController);




//Theme Switching
var themeController = (function (mainCtrl) {

    var strings = mainCtrl.stringpass();
    var sources = mainCtrl.sourcespass();

    var themeSwitch = function () {
        var themeValvar = document.querySelector(strings.themeVal);
        var themeValue = themeValvar.getAttribute('Value');
        const switchRemovevar = document.querySelector(strings.switchbtn);


        if (themeValue == 1) { //Light Mode to Dark Mode
            switchRemovevar.parentNode.removeChild(switchRemovevar);

            var themeSwitchInsert = `<div class="switchbtn small-padding light-color-mode"><img class="switch_logo" src="resources/svg/sun-outline.svg" onerror="this.src='resources/images/sun-outline.png'">&nbsp;Light&nbsp;Mode</div>`;
            document.querySelector(strings.header_themeswitch).insertAdjacentHTML('afterbegin', themeSwitchInsert);

            //Style Properties
            document.querySelector(strings.themeVal).style.setProperty('background-color', 'rgba(0, 0, 0)', "important");
            document.querySelector(strings.grid_box).style.setProperty('background-color', 'rgb(0, 0, 0)', "important");
            document.querySelector(strings.grid_box).style.setProperty('color', '#00FF00', "important");
            document.querySelector(strings.grid_box_main).style.setProperty('background-color', 'rgba(10, 10, 10, 0.71)', "important");
            document.querySelector(strings.loremTXT).style.setProperty('color', '#00FF00', "important");
            document.querySelector(strings.loremTXT).style.setProperty('background-image', 'repeating-linear-gradient(to bottom right, rgba(34, 32, 32, 0.19), rgba(83, 83, 83, 0.23))', "important");

            if (document.querySelector('.userinfo__ID') !== null) {
                document.querySelector('.userinfo__full-name').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__user-name').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__biography').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__followers').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__following').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__media-upload').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__ID').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.userinfo__acc-privacy').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.downloadSVG_main').src = '../resources/svg/ios-downloadGreen.svg';
                document.querySelector('.downloadTXT').style.setProperty('color', '#00FF00', "important");
                document.querySelector('.downloadbtn_container').style.setProperty('background-color', 'rgba(47, 47, 47, 0.44)', "important");
                document.querySelector('.downloadbtn_container').classList.remove('blue-background-light');
            }
            document.querySelector('.footer_a_a').style.setProperty('color', '#00FF00', "important");
            document.querySelector('.footer_a_b').style.setProperty('color', '#00FF00', "important");
            document.querySelector('.footer_a_c').style.setProperty('color', '#00FF00', "important");
            document.querySelector('.footer_a_d').style.setProperty('color', '#00FF00', "important");
            document.querySelector('.breaks').style.setProperty('background-color', '#00FF00', "important");
            document.querySelector('.dropdown-content__ele').classList.add("dropdown-content__elea");
            document.querySelector('.searchbox').classList.remove("box-grey-outline");
            document.querySelector('.searchbox').classList.add("box-greyDark-outline");
            document.querySelector('.searchbox_selector').classList.remove("grey-background-dark");
            document.querySelector('.searchbox_go').classList.remove("grey-background-light");
            document.querySelector('.searchbox').style.setProperty('background-color', 'rgba(34, 32, 32, 0.45)', "important");
            document.querySelector('.search_content').style.setProperty('background-color', 'rgba(20, 20, 20, 0)', "important");
            document.querySelector('.searchbox_input').style.setProperty('background-color', 'rgba(20, 20, 20, 0)', "important");
           
            document.querySelector('.search_content').style.setProperty('color', '#00FF00', "important");
            document.querySelector('.searchbox_go').classList.remove("btn-click-light");
            document.querySelector('.searchbox_go').classList.add("btn-click-dark");


        } else { // Dark Mode To Light Mode
            switchRemovevar.parentNode.removeChild(switchRemovevar);

            var themeSwitchInsert = `<div class="switchbtn small-padding dark-color-mode"><img class="switch_logo" src="resources/svg/moon-outline.svg" onerror="this.src='resources/images/moon-outline.png'">&nbsp;Night&nbsp;Mode</div>`;
            document.querySelector(strings.header_themeswitch).insertAdjacentHTML('afterbegin', themeSwitchInsert);

            //Style Properties
            document.querySelector(strings.themeVal).style.setProperty('background-color', 'white', "important");
            document.querySelector(strings.grid_box).style.setProperty('background-color', 'rgb(234, 234, 234)', "important");
            document.querySelector(strings.grid_box).style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
            document.querySelector(strings.grid_box_main).style.setProperty('background-color', 'rgb(255, 255, 255)', "important");
            document.querySelector(strings.loremTXT).style.setProperty('color', 'rgba(0, 0, 0, 0.96)', "important");
            document.querySelector(strings.loremTXT).style.setProperty('background-image', 'repeating-linear-gradient(to bottom right, rgba(82, 82, 82, 0.17), rgba(227, 227, 227, 0.32))', "important");

            if (document.querySelector('.userinfo__ID') !== null) {
                document.querySelector('.userinfo__full-name').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__user-name').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__biography').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__followers').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__following').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__media-upload').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__ID').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.userinfo__acc-privacy').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.downloadSVG_main').src = '../resources/svg/ios-download.svg';
                document.querySelector('.downloadTXT').style.setProperty('color', 'rgba(34, 36, 34, 0.84)', "important");
                document.querySelector('.downloadbtn_container').style.setProperty('background-color', 'rgba(32, 152, 245, 0.94)', "important");
                document.querySelector('.downloadbtn_container').classList.add('blue-background-light');
            }
            document.querySelector('.footer_a_a').style.setProperty('color', 'rgba(0, 0, 0, 0.78)', "important");
            document.querySelector('.footer_a_b').style.setProperty('color', 'rgba(0, 0, 0, 0.78)', "important");
            document.querySelector('.footer_a_c').style.setProperty('color', 'rgba(0, 0, 0, 0.78)', "important");
            document.querySelector('.footer_a_d').style.setProperty('color', 'rgba(0, 0, 0, 0.78)', "important");
            document.querySelector('.breaks').style.setProperty('background-color', '#585849', "important");

            document.querySelector('.searchbox').classList.remove("box-greyDark-outline");
            document.querySelector('.searchbox').classList.add("box-grey-outline");
            document.querySelector('.searchbox_selector').classList.add("grey-background-dark");
            document.querySelector('.searchbox_go').classList.add("grey-background-light");
            document.querySelector('.searchbox').style.setProperty('background-color', 'white', "important");
            document.querySelector('.search_content').style.setProperty('background-color', 'rgba(255, 255, 255, 0.97)', "important");
            document.querySelector('.searchbox_input').style.setProperty('background-color', 'rgba(255, 255, 255, 0.97)', "important");
            document.querySelector('.search_content').style.setProperty('color', 'rgba(0, 0, 0, 0.48)', "important");
            document.querySelector('.searchbox_go').classList.remove("btn-click-dark");
            document.querySelector('.searchbox_go').classList.add("btn-click-light");
            
        }
    }


    return {
        themefuncpass: function () {
            themeSwitch();
        }
    };
})(mainController);




//UI Controller
var uiController = (function (mainCtrl, imageCtrl, ipCtrl, themeCtrl) {

    var strings = mainCtrl.stringpass();

    //Initiates the code
    var starter = function () {
        //Focus On Input Box
        document.querySelector(strings.search_content).focus();

        //Search
        document.querySelector(strings.searchbox_go).addEventListener('click', imageCtrl.imgfuncpass);
        document.querySelector(strings.search_content).addEventListener('keypress', function (e) {
            if (e.which === 13 || e.keyCode === 13 || e.which === 9 || e.keyCode === 9 || e.which === 32 || e.keyCode === 32) {
                imageCtrl.imgfuncpass();

                //Focus on Image
                document.querySelector('.imageload').focus();
            }
        });

        //Theme Switch
        document.querySelector(strings.header_themeswitch).addEventListener('click', function () {
            themeCtrl.themefuncpass();
            var themeValvar = document.querySelector(strings.themeVal);
            var themeValue = themeValvar.getAttribute('Value');
            if (themeValue == 1) {
                themeValue = themeValvar.setAttribute('Value', 0);
            } else {
                themeValue = themeValvar.setAttribute('Value', 1);
            }
        });
    }

    return {
        init: function () {
            starter();
            ipCtrl.ipfuncpass();
        }
    }
})(mainController, image_controller, ipcontroller, themeController);

uiController.init();
