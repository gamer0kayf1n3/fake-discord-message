function getURLParams() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    if (urlParams.has('uname')) {
        var uname = urlParams.get('uname');
    } else {
        var uname = "Discord User";
    }(urlParams.has("dt"));
    if (urlParams.has('dt')) {
        var dt = urlParams.get('dt');
    } else {
        var dt = "Today";
    }
    if (urlParams.has('msg')) {
        var msg = urlParams.get('msg');

    } else {
        var msg = "Text here";
    }
    if (urlParams.has('pfp')) {
        var pfp = urlParams.get('pfp');
        alert(pfp);

    } else {
        var pfp = "https://pfps.gg/assets/pfps/4909-default-discord.png";
        try {

            var characters = [];
            request("https://api.genshin.dev/characters/", {}, function(data) {
                characters = data;
                alert(characters);
                if (characters.includes(uname)) {
                    alert(characters.includes(uname));
                    document.getElementById("profilepic").setAttribute("src", "https://api.genshin.dev/characters/" + uname + "/icon");
                } else {
                    document.getElementById("profilepic").setAttribute("src", pfp);
                }
            });

        } catch (e) {
            alert(e);
        }
    }
    if (urlParams.has('rolecol')) {

        var rolecol = urlParams.get('rolecol');

    } else {
        var rolecol = "#ffffff";
    }

}
function request(url, params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    let server_send = params;
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(server_send);
    xhr.onload = function(event) {
        console.log(event.target.response);
        callback(JSON.parse(event.target.response));
    };
}
function hexToRgbNew(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0, parseInt(hex, 16), false);
    var arrByte = new Uint8Array(arrBuff);

    return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function setValues() {
    console.log(msg);
    document.getElementById("username").innerHTML = uname + '<span style="    display: inline-block;margin-left: 5px;">     </span><span id="dateandtime">' + dt + '</span>';
    document.getElementById("message").innerHTML = replaceAll(msg, decodeURI("%0A"), "<br>");
    document.getElementById("username").style.color = rolecol;
    document.getElementById("username").style.fontWeight = "bold";
}
class matchFunctions {
    constructor() {
    }
    URLS() {
    var urls = msg.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    if (urls != null) {
        for (var i = 0; i < urls.length; i++) {
            msg = msg.replace(urls[i], '<span class="url">' + urls[i] + '</span>');
        }
    }
    }
    bold() {
    var alternate = 1;

        var boldcount = (msg.match(/\*\*/g)).length;

        for (var i = 0; i < boldcount; i++) {
            if (alternate) {
                msg = msg.replace("**", "<b>");
                console.log("replaced 1");
                alternate--;
            } else {
                msg = msg.replace("**", "</b>");
                console.log("replaced 2");
                alternate++;
            }
        }
    } 
    Slant() {
        try {
            var alternate = 1;
            var slantcount = (msg.match(/\*/g)).length;

            for (var i = 0; i < slantcount; i++) {
                if (alternate) {
                    msg = msg.replace("*", "<i>");
                    console.log("replaced 1");
                    alternate--;
                } else {
                    msg = msg.replace("*", "</i>");
                    console.log("replaced 2");
                    alternate++;
                }
            }
        } catch (e) {}
    }
    Strike() {

        try {
            var alternate = 1;
            var slantcount = (msg.match(/~~/g)).length;

            for (var i = 0; i < slantcount; i++) {
                if (alternate) {
                    msg = msg.replace("~~", "<strike>");
                    console.log("replaced 1");
                    alternate--;
                } else {
                    msg = msg.replace("~~", "</strike>");
                    console.log("replaced 2");
                    alternate++;
                }
            }
        } catch (e) {}
    }
    Spoilers() {
        try {
            var alternate = 1;
            var spoilercount = (msg.match(/||/g)).length;

            for (var i = 0; i < spoilercount; i++) {
                if (alternate) {
                    msg = msg.replace("||", "<span class='spoiler'>");
                    console.log("replaced 1");
                    alternate--;
                } else {
                    msg = msg.replace("||", "</span>");
                    console.log("replaced 2");
                    alternate++;
                }
            }
        } catch (e) {}
    }
    UserMention() {
        var temp = "";
        var content = "";
        try {
            var pinguser = (msg.match(/<([@#]+[A-z0-9\-~. ]{2,32})>/g));
            for (var i = 0; i < pinguser.length; i++) {
                content = pinguser[i];
                temp = /<([@#]+[A-z0-9\-~. ]{2,32})>/.exec(content)[1];
                msg = msg.replace(pinguser[i], "<span class='pinguser'>" + temp + "</span>");

            }
        } catch (e) {}
    }
    RoleMention() {
        var temp = "";
        var content = "";
        try {
            var pinguser = (msg.match(/<(@&+[A-z0-9\-~. ]{2,32})(#[ABCDEF0-9abcdef]{6})>/g));
            for (var i = 0; i < pinguser.length; i++) {
                content = pinguser[i];
                temp = /<(@&+[A-z0-9\-~. ]{2,32})(#[ABCDEF0-9abcdef]{6})>/.exec(content);
                msg = msg.replace(pinguser[i], "<span style='color: " + temp[2] + ";background-color:rgba(" + hexToRgbNew(temp[2].replace("#", "")) + ",0.5);'>" + temp[1].replace("&", "") + "</span>");

            }
        } catch (e) {}
    }
    Emojis() {
        var emojis = msg.match(/([:]+?[a-z0-9_-]+[:])/gi);
        if (emojis != null) {
            for (let i = 0; i < emojis.length; i++) {
                msg = replaceAll(msg, emojis[i], '<i class="em em-' + replaceAll(emojis[i], ":", "") + '" aria-role="presentation" aria-label="BAT"></i>');
            }
        }
    }
}

function init() {
    getURLParams(); //get the parameters passed by editor
    const match = matchFunctions();
    match.URLS();
    match.bold();
    match.Slant();
    match.Strike();
    match.Spoilers();
    match.UserMention();
    match.RoleMention();
    match.Emojis();
    setValues();
}
