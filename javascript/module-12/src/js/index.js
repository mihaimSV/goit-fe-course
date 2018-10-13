const LOCALSTORAGE = (w => {
    if (!w) return;
    const isActive = "localStorage" in w;

    const get = key => {
        try {
            const serializedState = localStorage.getItem(key);
            return serializedState === null ?
                undefined :
                JSON.parse(serializedState);
        } catch (err) {
            console.error("Get state error: ", err);
        }
    };

    const remove = key => {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error("Remove state error: ", err);
        }
    };

    const set = (key, value) => {
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (err) {
            console.error("Set state error: ", err);
        }
    };

    const clear = () => {
        try {
            localStorage.clear();
        } catch (err) {
            console.error("Clear state error: ", err);
        }
    };

    const publicAPI = {
        isActive,
        get,
        set,
        remove,
        clear,
    };

    return publicAPI;
})(window);

const api = {
    baseUrl: "https://api.linkpreview.net/",
    myKey: "5bb09717109fa9d825897e9782df267d7e97eed9cc5b8",
    getData(nameURL) {
        return fetch(this.baseUrl + "?key=" + this.myKey + "&q=" + nameURL)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Error while fetching " + response.statusText);
            })
            .catch(error => console.log(error));
    }
};

const rest = (wrap) => {
    return {
        inputs: wrap.querySelectorAll("input"),
        submitBtn: wrap.querySelector(".js-submit"),
    };
};

const paternURL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const paternParam = /\/([\w-]+)[\=\&\?]/;
const paternHttp = /\/\//;

const formInputBookmark = document.querySelector(".js-form");
const restNewBookmark = rest( formInputBookmark);
const listWrapper = document.querySelector(".list__wrap");
const source = document.querySelector("#bookmarkCart").innerHTML.trim();
const template = Handlebars.compile(source);

let myBookmarks = {};
if (LOCALSTORAGE.isActive) {
    Object.assign( myBookmarks, LOCALSTORAGE.get("myBookmarks") );
    let keysBkmk = Object.keys(myBookmarks);
    if (keysBkmk.length > 0) {
        const oldMarkup =
            keysBkmk.reduce( (acc, url) => acc + template( { 
                name:myBookmarks[url].name, 
                url:url, 
                descr:myBookmarks[url].descr, 
                img:myBookmarks[url].img
            }), "" );
        listWrapper.insertAdjacentHTML(
            "afterbegin",
            oldMarkup
        );
    }
}

function addNewBookmark(evt) {
    evt.preventDefault();
    let urlBkmk = restNewBookmark.inputs[1].value.trim();
    const positionParam = urlBkmk.search(paternParam);
    if ( positionParam > 0 ) urlBkmk = urlBkmk.substring(0, positionParam + 1);
    if ( !paternURL.test(urlBkmk) ) return alert("Некоректная ссылка!!!");
    if ( myBookmarks.hasOwnProperty(urlBkmk)) return alert("Закладка на эту страницу уже существует!");
    let aboutURL = {
        title: (paternHttp.test(urlBkmk)) ? urlBkmk.substring( urlBkmk.search( paternHttp ) + 2 ) : urlBkmk ,
        description: urlBkmk,
        image:"img/diary.png",
        url:"",
        error:""
    };
    api.getData(urlBkmk).then(objData => {
        Object.assign( aboutURL, objData );
        let titleBkmk = restNewBookmark.inputs[0].value.trim();
        if (titleBkmk.length < 1) titleBkmk = aboutURL.title;

        let descriptionBkmk = restNewBookmark.inputs[2].value.trim();
        if (descriptionBkmk.length < 1) descriptionBkmk = aboutURL.description;

        let imgBkmk = aboutURL.image;

        myBookmarks[urlBkmk] = {name:titleBkmk, descr:descriptionBkmk, img:imgBkmk};
        LOCALSTORAGE.set("myBookmarks", myBookmarks);
        const markup = template( { 
            name:myBookmarks[urlBkmk].name, 
            url:urlBkmk, 
            descr:myBookmarks[urlBkmk].descr, 
            img:myBookmarks[urlBkmk].img
        });
        listWrapper.insertAdjacentHTML(
            "afterbegin",
            markup
        );
    });
}

function handleDeleteBkmk(evt) {
    if (evt.target.nodeName === "BUTTON")  {
        const parentBkmk = evt.target.closest(".cart");
        const hrefForDelete = parentBkmk.querySelector(".cart__href").href;
        delete myBookmarks[hrefForDelete];
        LOCALSTORAGE.set("myBookmarks", myBookmarks);
        parentBkmk.remove();
    }
}

restNewBookmark.submitBtn.addEventListener("click", addNewBookmark);
listWrapper.addEventListener("click", handleDeleteBkmk);
