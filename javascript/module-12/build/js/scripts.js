"use strict";

var LOCALSTORAGE = function (w) {
    if (!w) return;
    var isActive = "localStorage" in w;

    var get = function get(key) {
        try {
            var serializedState = localStorage.getItem(key);
            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (err) {
            console.error("Get state error: ", err);
        }
    };

    var remove = function remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error("Remove state error: ", err);
        }
    };

    var set = function set(key, value) {
        try {
            var serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (err) {
            console.error("Set state error: ", err);
        }
    };

    var clear = function clear() {
        try {
            localStorage.clear();
        } catch (err) {
            console.error("Clear state error: ", err);
        }
    };

    var publicAPI = {
        isActive: isActive,
        get: get,
        set: set,
        remove: remove,
        clear: clear
    };

    return publicAPI;
}(window);

var api = {
    baseUrl: "https://api.linkpreview.net/",
    myKey: "5bb09717109fa9d825897e9782df267d7e97eed9cc5b8",
    getData: function getData(nameURL) {
        return fetch(this.baseUrl + "?key=" + this.myKey + "&q=" + nameURL).then(function (response) {
            if (response.ok) return response.json();
            throw new Error("Error while fetching " + response.statusText);
        }).catch(function (error) {
            return console.log(error);
        });
    }
};

var rest = function rest(wrap) {
    return {
        inputs: wrap.querySelectorAll("input"),
        submitBtn: wrap.querySelector(".js-submit")
    };
};

var paternURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
var paternParam = /\/([\w-]+)[\=\&\?]/;
var paternHttp = /\/\//;

var formInputBookmark = document.querySelector(".js-form");
var restNewBookmark = rest(formInputBookmark);
var listWrapper = document.querySelector(".list__wrap");
var source = document.querySelector("#bookmarkCart").innerHTML.trim();
var template = Handlebars.compile(source);

var myBookmarks = {};
if (LOCALSTORAGE.isActive) {
    Object.assign(myBookmarks, LOCALSTORAGE.get("myBookmarks"));
    var keysBkmk = Object.keys(myBookmarks);
    if (keysBkmk.length > 0) {
        var oldMarkup = keysBkmk.reduce(function (acc, url) {
            return acc + template({
                name: myBookmarks[url].name,
                url: url,
                descr: myBookmarks[url].descr,
                img: myBookmarks[url].img
            });
        }, "");
        listWrapper.insertAdjacentHTML("afterbegin", oldMarkup);
    }
}

function addNewBookmark(evt) {
    evt.preventDefault();
    var urlBkmk = restNewBookmark.inputs[1].value.trim();
    var positionParam = urlBkmk.search(paternParam);
    if (positionParam > 0) urlBkmk = urlBkmk.substring(0, positionParam + 1);
    if (!paternURL.test(urlBkmk)) return alert("Некоректная ссылка!!!");
    if (myBookmarks.hasOwnProperty(urlBkmk)) return alert("Закладка на эту страницу уже существует!");
    var aboutURL = {
        title: paternHttp.test(urlBkmk) ? urlBkmk.substring(urlBkmk.search(paternHttp) + 2) : urlBkmk,
        description: urlBkmk,
        image: "img/diary.png",
        url: "",
        error: ""
    };
    api.getData(urlBkmk).then(function (objData) {
        Object.assign(aboutURL, objData);
        var titleBkmk = restNewBookmark.inputs[0].value.trim();
        if (titleBkmk.length < 1) titleBkmk = aboutURL.title;

        var descriptionBkmk = restNewBookmark.inputs[2].value.trim();
        if (descriptionBkmk.length < 1) descriptionBkmk = aboutURL.description;

        var imgBkmk = aboutURL.image;

        myBookmarks[urlBkmk] = { name: titleBkmk, descr: descriptionBkmk, img: imgBkmk };
        LOCALSTORAGE.set("myBookmarks", myBookmarks);
        var markup = template({
            name: myBookmarks[urlBkmk].name,
            url: urlBkmk,
            descr: myBookmarks[urlBkmk].descr,
            img: myBookmarks[urlBkmk].img
        });
        listWrapper.insertAdjacentHTML("afterbegin", markup);
    });
}

function handleDeleteBkmk(evt) {
    if (evt.target.nodeName === "BUTTON") {
        var parentBkmk = evt.target.closest(".cart");
        var hrefForDelete = parentBkmk.querySelector(".cart__href").href;
        delete myBookmarks[hrefForDelete];
        LOCALSTORAGE.set("myBookmarks", myBookmarks);
        parentBkmk.remove();
    }
}

restNewBookmark.submitBtn.addEventListener("click", addNewBookmark);
listWrapper.addEventListener("click", handleDeleteBkmk);