//add highlight.js

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
    if (urlParams.has('pfp') || urlParams.get('pfp') != null) {
        var pfp = urlParams.get('pfp');
    } else {
        var pfp = "https://pfps.gg/assets/pfps/4909-default-discord.png";
        try {

            var characters = [];
            request("https://api.genshin.dev/characters/", {}, function(data) {
                characters = data;
                if (characters.includes(uname)) {
                    var pfp = "https://api.genshin.dev/characters/" + uname + "/icon";
                }
            });
        
        } catch (e) {
        }
    }
    if (urlParams.has('rolecol')) {

        var rolecol = urlParams.get('rolecol');

    } else {
        var rolecol = "#ffffff";
    }
    return [uname, dt, msg, pfp, rolecol];
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
function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function setValues(a,b,c,d,e) {
try{
    console.log(c);
    document.getElementById("username").innerHTML = a + '<span style="    display: inline-block;margin-left: 5px;">     </span><span id="dateandtime">' + b + '</span>';
    document.getElementById("message").innerHTML = replaceAll(c, decodeURI("%0A"), "<br>");
    for (var i = 0; i < document.getElementById("message").querySelectorAll("pre code").length; i++) {
        document.getElementById("message").querySelectorAll("pre code")[i].innerHTML = replaceAll(document.getElementById("message").querySelectorAll("pre code")[i].innerHTML, "<br>", decodeURI("%0A"));
    }
    document.getElementById("username").style.color = e;
    document.getElementById("username").style.fontWeight = "bold";
    document.getElementById("profilepic").setAttribute("src", d);
}catch(er){}
}
class matchFunctions {
    constructor() {
    }
    URLS(message) {
    var urls = message.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    if (urls != null) {
        for (var i = 0; i < urls.length; i++) {
            message = message.replace(urls[i], '<span class="url">' + urls[i] + '</span>');
        }
        return message;
    }else {return message;}
    }
    bold(message) {
try{
    var alternate = 1;

        var boldcount = (message.match(/\*\*/g)).length;

        for (var i = 0; i < boldcount; i++) {
            if (alternate) {
                console.log("replaced 1");
                alternate--;
                message = message.replace("**", "<b>");
                
            } else {
                console.log("replaced 2");
                alternate++;
                message = message.replace("**", "</b>");
            }
        }
        return message;
}catch(e){return message;}
    } 
    Slant(message) {
        try {
            var alternate = 1;
            var slantcount = (message.match(/\*/g)).length;

            for (var i = 0; i < slantcount; i++) {
                if (alternate) {
                    console.log("replaced 1");
                    alternate--;
                    message = message.replace("*", "<i>");
                } else {
                    console.log("replaced 2");
                    alternate++;
                    message = message.replace("*", "</i>");
                }
            }
            return message;
        } catch (e) {return message;}
    }
    Strike(message) {

        try {
            var alternate = 1;
            var slantcount = (message.match(/~~/g)).length;

            for (var i = 0; i < slantcount; i++) {
                if (alternate) {
                    console.log("replaced 1");
                    alternate--;
                    message = message.replace("~~", "<strike>");
                } else {
                    console.log("replaced 2");
                    alternate++;
                    message = message.replace("~~", "</strike>");
                }
            }
            return message;
        } catch (e) {return message;}
    }
    Spoilers(message) {
        try {
            var alternate = 1;
            var spoilercount = (message.match(/||/g)).length;

            for (var i = 0; i < spoilercount; i++) {
                if (alternate) {
                    console.log("replaced 1");
                    alternate--;
                    message = message.replace("||", "<span class='spoiler'>");
                } else {
                    console.log("replaced 2");
                    alternate++;
                    message = message.replace("||", "</span>");
                }
            }
            return message;
        } catch (e) {return message;}
    }
    UserMention(message) {
        var temp = "";
        var content = "";
        try {
            var pinguser = (message.match(/<([@#]+[A-z0-9\-~. ]{2,32})>/g));
            for (var i = 0; i < pinguser.length; i++) {
                content = pinguser[i];
                temp = /<([@#]+[A-z0-9\-~. ]{2,32})>/.exec(content)[1];
                message = message.replace(pinguser[i], "<span class='pinguser'>" + temp + "</span>");

            }
            return message;
        } catch (e) {return message;}
    }
    RoleMention(message) {
        var temp = "";
        var content = "";
        try {
            var pinguser = (message.match(/<(@&+[A-z0-9\-~. ]{2,32})(#[ABCDEF0-9abcdef]{6})>/g));
            for (var i = 0; i < pinguser.length; i++) {
                content = pinguser[i];
                temp = /<(@&+[A-z0-9\-~. ]{2,32})(#[ABCDEF0-9abcdef]{6})>/.exec(content);
                message = message.replace(pinguser[i], "<span style='color: " + temp[2] + ";background-color:rgba(" + hexToRgbNew(temp[2].replace("#", "")) + ",0.5);'>" + temp[1].replace("&", "") + "</span>");

            }
            return message;
        } catch (e) {return message;}
    }
    Emojis(message) {
        var emojis = message.match(/([:]+?[a-z0-9_-]+[:])/gi);
        if (emojis != null) {
            for (let i = 0; i < emojis.length; i++) {
                return replaceAll(message, emojis[i], '<i class="em em-' + replaceAll(emojis[i], ":", "") + '" aria-role="presentation" aria-label="BAT"></i>');
            }
            return message;
        } else {return message;}
    }
 codeblocks(message) {
     try {
    //<pre><code class="nohighlight">...</code></pre>
    var codeblocks_detection = /```(?<language>[a-z]*)\n(?<code>[\s\S]*?)\n```/g;
    var arrayOfCodeBlocks = message.match(codeblocks_detection);
    if (arrayOfCodeBlocks != null) {
        
        for(var i=0; i < arrayOfCodeBlocks.length; i++) {//while codeblocks still exist
            var codeblocks_detection = /```(?<language>[a-z]*)\n(?<code>[\s\S]*?)\n```/;
            var codeblock_separation = codeblocks_detection.exec(arrayOfCodeBlocks[i]); //get parameters of each codeblock
            console.log(codeblock_separation); 
            var codeblock_language = codeblock_separation.groups.language; //set them on a variable
            var codeblock_content = codeblock_separation.groups.code; 
            if (codeblock_language == "") { /*if codeblock_language is empty, make it plaintext*/
                codeblock_language = "plaintext";
            }
            
            message = message.replace(arrayOfCodeBlocks[i], `<pre><code class="language-` + codeblock_language + `">` + codeblock_content + `</code></pre>`); //%
        } return message;
        
    } else {
return message;
}
}
catch(e){ return message;}}
}

function init() {
    var [uname, dt, msg, pfp, rolecol] = getURLParams(); //get the parameters passed by editor
    const match = new matchFunctions();
    msg = match.URLS(msg);
    msg = match.bold(msg);
    msg = match.Slant(msg);
    msg = match.Strike(msg);
    msg = match.Spoilers(msg);
    msg = match.UserMention(msg);
    msg = match.RoleMention(msg);
    msg = match.Emojis(msg);
    msg = match.codeblocks(msg);
    hljs.highlightAll();

    setValues(uname, dt, msg, pfp, rolecol);
}
