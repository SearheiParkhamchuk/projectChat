function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function userTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug":"div.user\n    h1.user__username.toggle.toggled(data-toggle='username')=username\n    form.user-form.user-form__username.hidden(data-action='setUsername')\n        input.user__input.user__input_username(name='username' placeholder='Укажите имя')\n        input.user__input.user__input_button.input_button(type='submit' value='\u003E')\n    form.user-form.user-form__avatar.hidden(data-action='setAvatar')\n        input.user__input.user__input_avatar(name='avatarUrl' placeholder='URL аватары')\n        input.user__input.user__input_button.input_button(type='submit' value='\u003E')\n    figure.user__avatar\n        img.toggle(data-toggle='avatar' src=avatarUrl alt=username)\n"};
;var locals_for_with = (locals || {});(function (avatarUrl, username) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cdiv class=\"user\"\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Ch1 class=\"user__username toggle toggled\" data-toggle=\"username\"\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = username) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cform class=\"user-form user-form__username hidden\" data-action=\"setUsername\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cinput class=\"user__input user__input_username\" name=\"username\" placeholder=\"Укажите имя\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cinput class=\"user__input user__input_button input_button\" type=\"submit\" value=\"&gt;\"\u002F\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cform class=\"user-form user-form__avatar hidden\" data-action=\"setAvatar\"\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cinput class=\"user__input user__input_avatar\" name=\"avatarUrl\" placeholder=\"URL аватары\"\u002F\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cinput class=\"user__input user__input_button input_button\" type=\"submit\" value=\"&gt;\"\u002F\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cfigure class=\"user__avatar\"\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fcomponents\u002Fuser\u002Fuser.tmpl.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"toggle\""+" data-toggle=\"avatar\""+pug_attr("src", avatarUrl, true, false)+pug_attr("alt", username, true, false)) + "\u002F\u003E\u003C\u002Ffigure\u003E\u003C\u002Fdiv\u003E";}.call(this,"avatarUrl" in locals_for_with?locals_for_with.avatarUrl:typeof avatarUrl!=="undefined"?avatarUrl:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}