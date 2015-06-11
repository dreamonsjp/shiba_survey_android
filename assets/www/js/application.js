var g_loadedFully = false;
var g_selectedSid = '';
var g_selectedSurveyLang = 'en';
var g_currentPage = '';
var g_loggedIn = false;
var g_newdata =  true;
var g_username = '';
var g_savedCode = '';
var g_forceRefreshListSurvey = false;

var g_selectedFileURI = '';
var g_uploadingFile = false;

var g_sendingSurveyList = [];

var g_sendingSurvey;

var g_isSendAll = false;

var g_surveyPreivewSelectedItem;

var g_buttonSendItem;

var g_numSend = 0;

var g_total2Send = 0;

var g_refreshing = false;

var g_lastURL;

var g_lastUsername;

var g_currentLatitude = 0;
var g_currentLongtitude = 0;

$.event.special.swipe.horizontalDistanceThreshold = 250;

function confirmDialog(title, text, callback) {
    var popupDialogId = 'popupDialog';
    $('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="pop" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"> \
                        <div data-role="header" data-theme="a">\
                            <h1>'+title+'</h1>\
                        </div>\
                        <div role="main" class="ui-content">\
                            <h3 class="ui-title">' + text + '</h3>\
                            <div style="text-align: center;margin:0 auto;margin-left:auto;margin-right:auto;align:center;text-align:center;">\
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back" >Yes</a>\
                            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionCancel" data-transition="flow">No</a>\
                           </div>\
                        </div>\
                    </div>')
        .appendTo($.mobile.pageContainer);
    var popupDialogObj = $('#' + popupDialogId);
    popupDialogObj.trigger('create');
    popupDialogObj.popup({
        history: false,
        afterclose: function (event, ui) {
            popupDialogObj.find(".optionConfirm").first().off('click');
            var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
            $(event.target).remove();
            if (isConfirmed && callback) {
                callback();
            }
        }
    });
    popupDialogObj.popup('open',{ history: false });
    popupDialogObj.find(".optionConfirm").first().on('click', function () {
        popupDialogObj.attr('data-confirmed', 'yes');
    });
    popupDialogObj.find(".optionCancel").first().on('click', function () {
       
        popupDialogObj.popup('close',{ history: false });
    });
}

function openLoadingSurveyPopup()
{
    var popupDialogId = 'popupLoadingSurvey';
    
    var popupDialogObj = $('#' + popupDialogId);
    
    popupDialogObj.popup('open',{ history: false });
}

function closeLoadingSurveyPopup()
{
    var popupDialogId = 'popupLoadingSurvey';
    var popupDialogObj = $('#' + popupDialogId);
    
    popupDialogObj.popup('close');
}

function sleep(milliseconds) 
{
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//function LEMcount(){var b=0;for(i=0;i<arguments.length;++i){var a=arguments[i];if(a!==""){++b}}return b}function LEMunique(){var b=new Array();for(i=0;i<arguments.length;++i){var a=arguments[i];if(trim(a)==""){continue}if(typeof b[a]!=="undefined"){return false}b[a]=1}return true}function LEMcountif(){var b=0;var c=arguments[0];for(i=1;i<arguments.length;++i){var a=arguments[i];if(a==c){++b}}return b}function LEMcountifop(){var b=0;var f=arguments[0];var e=arguments[1];if(f=="RX"){var c=new RegExp(e.substr(1,e.length-2))}for(i=2;i<arguments.length;++i){var a=arguments[i];switch(f){case"==":case"eq":if(a==e){++b}break;case">=":case"ge":if(a>=e){++b}break;case">":case"gt":if(a>e){++b}break;case"<=":case"le":if(a<=e){++b}break;case"<":case"lt":if(a<e){++b}break;case"!=":case"ne":if(a!=e){++b}break;case"RX":try{if(c.test(a)){++b}}catch(d){return false}}}return b}function LEMsumifop(){var b=0;var f=arguments[0];var e=arguments[1];if(f=="RX"){var c=new RegExp(e.substr(1,e.length-2))}for(i=2;i<arguments.length;++i){var a=arguments[i];switch(f){case"==":case"eq":if(a==e){b+=a}break;case">=":case"ge":if(a>=e){b+=a}break;case">":case"gt":if(a>e){b+=a}break;case"<=":case"le":if(a<=e){b+=a}break;case"<":case"lt":if(a<e){b+=a}break;case"!=":case"ne":if(a!=e){b+=a}break;case"RX":try{if(c.test(a)){b+=a}}catch(d){return false}}}return b}function LEMpi(){return Math.PI}function LEMsum(){var b=0;for(i=0;i<arguments.length;++i){var a=arguments[i];if(!isNaN(a)){b+=(+a)}}return b}function LEMintval(b){if(isNaN(b)){return NaN}return Math.floor(+b)}function LEMis_null(b){return(b==null)}function LEMis_float(b){if(isNaN(b)){return false}var c=new Number(b);return(Math.floor(c)!=c)}function LEMis_int(b){if(isNaN(b)){return false}var c=new Number(b);return(Math.floor(c)==c)}function LEMis_numeric(b){if(b===""){return false}return !(isNaN(b))}function LEMis_string(b){return isNaN(b)}function LEMif(e,d,f){if(e==="0"){return f}return(!!e)?d:f}function LEMlist(){var b="";var c=", ";j=1;for(i=0;i<arguments.length;++i){var a=arguments[i];if(a!==""){if(j>1){b+=c+a}else{b+=a}++j}}return b}function LEMlog(){if(arguments.length<1){return NaN}var a=Math.exp(1);if(arguments.length>1){a=arguments[1];if(isNaN(a)){return NaN}if(a<=0){return NaN}a=Math.abs(parseFloat(arguments[1]))}if(a==Math.exp(1)){return Math.log(arguments[0])}else{return Math.log(arguments[0])/Math.log(a)}}function LEMjoin(){var a="";for(i=0;i<arguments.length;++i){a+=arguments[i]}return a}function LEMimplode(){var b="";if(arguments.length<=1){return""}var c=arguments[0];for(i=1;i<arguments.length;++i){var a=arguments[i];if(i>1){b+=c+a}else{b+=a}}return b}function LEMregexMatch(d,a){try{var b=new RegExp(d.substr(1,d.length-2));return b.test(a)}catch(c){return false}}function LEMstrlen(b){var c=new String(b);return c.length}function LEMstr_replace(c,a,b){var d=new String(b);return d.replace(c,a)}function LEMstrpos(a,b){var c=new String(a);return c.search(b)}function LEMempty(a){if(a===""||a===false){return true}return false}function LEMbool(a){bool=new Boolean(a);if(a.valueOf()&&a!="false"){return true}return false}function LEMeq(d,c){if((d==="true"&&c==="1")||(d==="1"&&c==="true")){return true}if((d==="false"&&(c==="0"||c===""))||((d==="0"||d==="")&&c==="false")){return true}return d==c}function LEMval(b){var e=new String(b);var f=b;var d="code";if(typeof bNumRealValue=="undefined"){bNumRealValue=false}if(e==""){return""}newval=e;if(LEMradix===","){newval=e.split(",").join(".")}if(newval==parseFloat(newval)){if(newval.length>0&&newval[0]==0){return newval}return +newval}if(e.match(/^INSERTANS:/)){d="shown";f=f.substr(10)}else{if(e.match(/\.(code|gid|grelevance|gseq|jsName|mandatory|NAOK|qid|qseq|question|readWrite|relevanceStatus|relevance|rowdivid|sgqa|shown|type|valueNAOK|value)$/)){f=e.replace(/\.(code|gid|grelevance|gseq|jsName|mandatory|NAOK|qid|qseq|question|readWrite|relevanceStatus|relevance|rowdivid|sgqa|shown|type|valueNAOK|value)$/,"");d=e.replace(/^(.+)\./,"")}}jsName=LEMalias2varName[f];attr=LEMvarNameAttr[jsName];if((d.match(/^code|NAOK|shown|valueNAOK|value$/))&&attr.qid!=""){if(!LEMval(f+".relevanceStatus")){return""}}var c;if(LEMmode=="survey"||(LEMmode=="group"&&attr.gseq==LEMgseq)||(LEMmode=="question"&&attr.qid==LEMqid)){c=(typeof attr.jsName_on==="undefined")?attr.jsName:attr.jsName_on}else{c=attr.jsName}if(c===null||typeof document.getElementById(c)==="undefined"||document.getElementById(c)===null){an_error=true;return""}switch(d){case"relevanceStatus":grel=qrel=sgqarel=1;if(!(typeof attr.gseq==="undefined")&&!(document.getElementById("relevanceG"+attr.gseq)===null)){if(typeof attr.type==="undefined"||attr.type!="*"){grel=parseInt(document.getElementById("relevanceG"+attr.gseq).value)}}if(!(typeof attr.qid==="undefined")&&!(document.getElementById("relevance"+attr.qid)===null)){qrel=parseInt(document.getElementById("relevance"+attr.qid).value)}if(!(typeof attr.rowdivid==="undefined")&&!(document.getElementById("relevance"+attr.rowdivid)===null)){sgqarel=parseInt(document.getElementById("relevance"+attr.rowdivid).value)}return(grel&&qrel&&sgqarel);case"shown":value=htmlspecialchars_decode(document.getElementById(c).value);switch(attr.type){case"G":case"Y":case"C":case"E":shown=(typeof attr.answers[value]==="undefined")?"":attr.answers[value];break;case"!":case"L":case"O":case"H":case"F":case"R":if(attr.type=="O"&&f.match(/comment$/)){answer=value}else{if((attr.type=="L"||attr.type=="!")&&f.match(/_other$/)){answer=value}else{which_ans="0~"+value;if(typeof attr.answers[which_ans]==="undefined"){answer=value}else{answerParts=attr.answers[which_ans].split("|");answerParts.shift();answer=answerParts.join("|")}}}shown=answer;break;case"1":prefix=(attr.jsName.match(/_1$/))?"1":"0";which_ans=prefix+"~"+value;if(typeof attr.answers[which_ans]==="undefined"){answer=""}else{answerParts=attr.answers[which_ans].split("|");answerParts.shift();answer=answerParts.join("|")}shown=answer;break;case"A":case"B":case":":case"5":case"N":case"K":case"Q":case";":case"S":case"T":case"U":case"D":case"*":case"I":case"|":case"X":shown=value;break;case"M":case"P":if(typeof attr.question==="undefined"||value==""){shown=""}else{if(attr.type=="P"&&f.match(/comment$/)){shown=value}else{shown=htmlspecialchars_decode(attr.question)}}break}return htmlspecialchars_decode(shown);case"gid":return attr.gid;case"grelevance":return attr.grelevance;case"mandatory":return attr.mandatory;case"qid":return attr.qid;case"question":return htmlspecialchars_decode(attr.question);case"readWrite":return attr.readWrite;case"relevance":return htmlspecialchars_decode(attr.relevance);case"sgqa":return attr.sgqa;case"type":return attr.type;case"gseq":return attr.gseq;case"qseq":return attr.qseq;case"jsName":return c;case"code":case"NAOK":case"value":case"valueNAOK":value=htmlspecialchars_decode(document.getElementById(c).value);if(value===""){return""}if(d=="value"||d=="valueNAOK"){switch(attr.type){case"!":case"L":case"O":case"H":case"F":case"R":if(attr.type=="O"&&f.match(/comment$/)){}else{if((attr.type=="L"||attr.type=="!")&&f.match(/_other$/)){}else{which_ans="0~"+value;if(typeof attr.answers[which_ans]==="undefined"){value=""}else{answerParts=attr.answers[which_ans].split("|");value=answerParts[0]}}}break;case"1":prefix=(attr.jsName.match(/_1$/))?"1":"0";which_ans=prefix+"~"+value;if(typeof attr.answers[which_ans]==="undefined"){value=""}else{answerParts=attr.answers[which_ans].split("|");value=answerParts[0]}break}}if(typeof attr.onlynum!=="undefined"&&attr.onlynum==1){if(value==""){return""}if(LEMradix===","){var a=/^-?\d*\,?\d*$/}else{var a=/^-?\d*\.?\d*$/}if(!a.test(value)){if(bNumRealValue){return value}else{return""}}newval=value;if(LEMradix===","){newval=value.split(",").join(".")}return +newval}else{if(isNaN(value)){if(value==="false"){return""}return value}else{if(value.length>0&&value[0]==0){return value}return +value}}case"rowdivid":if(typeof attr.rowdivid==="undefined"||attr.rowdivid==""){return""}return attr.rowdivid;default:return"Unknown Attribute: ".suffix}}function LEMfixnum(b){var a=String(b);if(parseFloat(a)!=b){return b}if(LEMradix===","){a=a.split(".").join(",");if(parseFloat(a)!=b){return b}}return b}function LEMstrip_tags(b){var a=document.createElement("DIV");a.innerHTML=b;return a.textContent||a.innerText}function LEMstddev(){vals=new Array();j=0;for(i=0;i<arguments.length;++i){if(LEMis_numeric(arguments[i])){vals[j++]=arguments[i]}}count=vals.length;if(count<=1){return 0}sum=0;for(i=0;i<vals.length;++i){sum+=vals[i]}mean=sum/count;sumsqmeans=0;for(i=0;i<vals.length;++i){sumsqmeans+=(vals[i]-mean)*(vals[i]-mean)}stddev=Math.sqrt(sumsqmeans/(count-1));return stddev}function LEMstrtoupper(a){return a.toUpperCase()}function LEMstrtolower(a){return a.toLowerCase()}function LEManyNA(){for(i=0;i<arguments.length;++i){var a=arguments[i];if(a.match(/\.NAOK$/)){continue}if(typeof LEMalias2varName[a]==="undefined"){continue}jsName=LEMalias2varName[a];if(typeof LEMvarNameAttr[jsName]==="undefined"){continue}attr=LEMvarNameAttr[jsName];if(!LEMval(attr.sgqa+".relevanceStatus")){return true}}return false}function LEMsetTabIndexes(){if(typeof tabIndexesSet=="undefined"){$("#limesurvey :input[type!=hidden][id!=runonce]").each(function(a){$(this).bind("keydown",function(b){if(b.keyCode==9){checkconditions($(this).attr("value"),$(this).attr("name"),$(this).attr("type"),"TAB");$(this).focus();return true}return true})});tabIndexesSet=true}}function LEMflagMandOther(b,a){if(a){if($.trim($("#java"+b).val())==""){$("#answer"+b).addClass("em_sq_validation error").removeClass("good")}else{$("#answer"+b).addClass("em_sq_validation good").removeClass("error")}}else{$("#answer"+b).addClass("em_sq_validation good").removeClass("error")}}function is_bool(a){return(typeof a==="boolean")}function addslashes(a){return(a+"").replace(/[\\"']/g,"\\$&").replace(/\u0000/g,"\\0")}function html_entity_decode(c,f){var e={},d="",a="",b="";a=c.toString();if(false===(e=this.get_html_translation_table("HTML_ENTITIES",f))){return false}delete (e["&"]);e["&"]="&amp;";for(d in e){b=e[d];a=a.split(b).join(d)}a=a.split("&#039;").join("'");return a}function htmlentities(d,h,g,a){var f={},e="",c="",b=this;d+="";a=!!a||a==null;if(false===(f=this.get_html_translation_table("HTML_ENTITIES",h))){return false}f["'"]="&#039;";if(a){for(e in f){c=f[e];d=d.split(e).join(c)}}else{d=d.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);|$)/g,function(m,l,k){return b.htmlentities(l,h,g)+k})}return d}function get_html_translation_table(k,g){var d={},f={},c=0,a="";var e={},b={};var l={},h={};e[0]="HTML_SPECIALCHARS";e[1]="HTML_ENTITIES";b[0]="ENT_NOQUOTES";b[2]="ENT_COMPAT";b[3]="ENT_QUOTES";l=!isNaN(k)?e[k]:k?k.toUpperCase():"HTML_SPECIALCHARS";h=!isNaN(g)?b[g]:g?g.toUpperCase():"ENT_COMPAT";if(l!=="HTML_SPECIALCHARS"&&l!=="HTML_ENTITIES"){throw new Error("Table: "+l+" not supported")}d["38"]="&amp;";if(l==="HTML_ENTITIES"){d["160"]="&nbsp;";d["161"]="&iexcl;";d["162"]="&cent;";d["163"]="&pound;";d["164"]="&curren;";d["165"]="&yen;";d["166"]="&brvbar;";d["167"]="&sect;";d["168"]="&uml;";d["169"]="&copy;";d["170"]="&ordf;";d["171"]="&laquo;";d["172"]="&not;";d["173"]="&shy;";d["174"]="&reg;";d["175"]="&macr;";d["176"]="&deg;";d["177"]="&plusmn;";d["178"]="&sup2;";d["179"]="&sup3;";d["180"]="&acute;";d["181"]="&micro;";d["182"]="&para;";d["183"]="&middot;";d["184"]="&cedil;";d["185"]="&sup1;";d["186"]="&ordm;";d["187"]="&raquo;";d["188"]="&frac14;";d["189"]="&frac12;";d["190"]="&frac34;";d["191"]="&iquest;";d["192"]="&Agrave;";d["193"]="&Aacute;";d["194"]="&Acirc;";d["195"]="&Atilde;";d["196"]="&Auml;";d["197"]="&Aring;";d["198"]="&AElig;";d["199"]="&Ccedil;";d["200"]="&Egrave;";d["201"]="&Eacute;";d["202"]="&Ecirc;";d["203"]="&Euml;";d["204"]="&Igrave;";d["205"]="&Iacute;";d["206"]="&Icirc;";d["207"]="&Iuml;";d["208"]="&ETH;";d["209"]="&Ntilde;";d["210"]="&Ograve;";d["211"]="&Oacute;";d["212"]="&Ocirc;";d["213"]="&Otilde;";d["214"]="&Ouml;";d["215"]="&times;";d["216"]="&Oslash;";d["217"]="&Ugrave;";d["218"]="&Uacute;";d["219"]="&Ucirc;";d["220"]="&Uuml;";d["221"]="&Yacute;";d["222"]="&THORN;";d["223"]="&szlig;";d["224"]="&agrave;";d["225"]="&aacute;";d["226"]="&acirc;";d["227"]="&atilde;";d["228"]="&auml;";d["229"]="&aring;";d["230"]="&aelig;";d["231"]="&ccedil;";d["232"]="&egrave;";d["233"]="&eacute;";d["234"]="&ecirc;";d["235"]="&euml;";d["236"]="&igrave;";d["237"]="&iacute;";d["238"]="&icirc;";d["239"]="&iuml;";d["240"]="&eth;";d["241"]="&ntilde;";d["242"]="&ograve;";d["243"]="&oacute;";d["244"]="&ocirc;";d["245"]="&otilde;";d["246"]="&ouml;";d["247"]="&divide;";d["248"]="&oslash;";d["249"]="&ugrave;";d["250"]="&uacute;";d["251"]="&ucirc;";d["252"]="&uuml;";d["253"]="&yacute;";d["254"]="&thorn;";d["255"]="&yuml;"}if(h!=="ENT_NOQUOTES"){d["34"]="&quot;"}if(h==="ENT_QUOTES"){d["39"]="&#39;"}d["60"]="&lt;";d["62"]="&gt;";for(c in d){a=String.fromCharCode(c);f[a]=d[c]}return f}function htmlspecialchars(c,h,g,b){var e=0,d=0,f=false;if(typeof h==="undefined"||h===null){h=3}c=c.toString();if(b!==false){c=c.replace(/&/g,"&amp;")}c=c.replace(/</g,"&lt;").replace(/>/g,"&gt;");var a={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(h===0){f=true}if(typeof h!=="number"){h=[].concat(h);for(d=0;d<h.length;d++){if(a[h[d]]===0){f=true}else{if(a[h[d]]){e=e|a[h[d]]}}}h=e}if(h&a.ENT_HTML_QUOTE_SINGLE){c=c.replace(/'/g,"&#039;")}if(!f){c=c.replace(/"/g,"&quot;")}return c}function htmlspecialchars_decode(b,f){var d=0,c=0,e=false;if(typeof f==="undefined"){f=3}b=b.toString().replace(/&lt;/g,"<").replace(/&gt;/g,">");var a={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};if(f===0){e=true}if(typeof f!=="number"){f=[].concat(f);for(c=0;c<f.length;c++){if(a[f[c]]===0){e=true}else{if(a[f[c]]){d=d|a[f[c]]}}}f=d}if(f&a.ENT_HTML_QUOTE_SINGLE){b=b.replace(/&#0*39;/g,"'")}if(!e){b=b.replace(/&quot;/g,'"')}b=b.replace(/&amp;/g,"&");return b}function ltrim(c,b){b=!b?" \\s\u00A0":(b+"").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1");var a=new RegExp("^["+b+"]+","g");return(c+"").replace(a,"")}function nl2br(c,b){var a=(b||typeof b==="undefined")?"":"<br>";return(c+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1"+a+"$2")}function number_format(f,c,h,e){f=(f+"").replace(/[^0-9+\-Ee.]/g,"");var b=!isFinite(+f)?0:+f,a=!isFinite(+c)?0:Math.abs(c),l=(typeof e==="undefined")?",":e,d=(typeof h==="undefined")?".":h,k="",g=function(p,o){var m=Math.pow(10,o);return""+Math.round(p*m)/m};k=(a?g(b,a):""+Math.round(b)).split(".");if(k[0].length>3){k[0]=k[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,l)}if((k[1]||"").length<a){k[1]=k[1]||"";k[1]+=new Array(a-k[1].length+1).join("0")}return k.join(d)}function quoted_printable_decode(d){var b=/=\r\n/gm,a=/=([0-9A-F]{2})/gim,c=function(e,f){return String.fromCharCode(parseInt(f,16))};return d.replace(b,"").replace(a,c)}function quoted_printable_encode(e){var d=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],a=/ \r\n|\r\n|[^!-<>-~ ]/gm,c=function(h){if(h.length>1){return h.replace(" ","=20")}var g=h.charCodeAt(0);return"="+d[((g>>>4)&15)]+d[(g&15)]},f=/.{1,72}(?!\r\n)[^=]{0,3}/g,b=function(g){if(g.substr(g.length-2)==="\r\n"){return g}return g+"=\r\n"};e=e.replace(a,c).replace(f,b);return e.substr(0,e.length-3)}function quotemeta(a){return(a+"").replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g,"\\$1")}function round(d,b,h){var a,c,e,g;b|=0;a=Math.pow(10,b);d*=a;g=(d>0)|-(d<0);e=d%1===0.5*g;c=Math.floor(d);if(e){switch(h){case"PHP_ROUND_HALF_DOWN":d=c+(g<0);break;case"PHP_ROUND_HALF_EVEN":d=c+(c%2*g);break;case"PHP_ROUND_HALF_ODD":d=c+!(c%2);break;default:d=c+(g>0)}}return(e?d:Math.round(d))/a}function rtrim(c,b){b=!b?" \\s\u00A0":(b+"").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"\\$1");var a=new RegExp("["+b+"]+$","g");return(c+"").replace(a,"")}function sprintf(){var g=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;var h=arguments,f=0,l=h[f++];var b=function(p,a,m,o){if(!m){m=" "}var n=(p.length>=a)?"":Array(1+a-p.length>>>0).join(m);return o?p+n:n+p};var c=function(o,n,r,a,m,q){var p=a-o.length;if(p>0){if(r||!m){o=b(o,a,q,r)}else{o=o.slice(0,n.length)+b("",p,"0",true)+o.slice(n.length)}}return o};var k=function(r,q,p,s,m,a,o){var n=r>>>0;p=p&&n&&{"2":"0b","8":"0","16":"0x"}[q]||"";r=p+b(n.toString(q),a||0,"0",false);return c(r,p,s,m,o)};var e=function(o,q,m,a,n,p){if(a!=null){o=o.slice(0,a)}return c(o,"",q,m,n,p)};var d=function(B,o,p,t,D,y,n){var a;var x;var m;var C;var v;if(B=="%%"){return"%"}var u=false,q="",s=false,A=false,z=" ";var r=p.length;for(var w=0;p&&w<r;w++){switch(p.charAt(w)){case" ":q=" ";break;case"+":q="+";break;case"-":u=true;break;case"'":z=p.charAt(w+1);break;case"0":s=true;break;case"#":A=true;break}}if(!t){t=0}else{if(t=="*"){t=+h[f++]}else{if(t.charAt(0)=="*"){t=+h[t.slice(1,-1)]}else{t=+t}}}if(t<0){t=-t;u=true}if(!isFinite(t)){throw new Error("sprintf: (minimum-)width must be finite")}if(!y){y="fFeE".indexOf(n)>-1?6:(n=="d")?0:undefined}else{if(y=="*"){y=+h[f++]}else{if(y.charAt(0)=="*"){y=+h[y.slice(1,-1)]}else{y=+y}}}v=o?h[o.slice(0,-1)]:h[f++];switch(n){case"s":return e(String(v),u,t,y,s,z);case"c":return e(String.fromCharCode(+v),u,t,y,s);case"b":return k(v,2,A,u,t,y,s);case"o":return k(v,8,A,u,t,y,s);case"x":return k(v,16,A,u,t,y,s);case"X":return k(v,16,A,u,t,y,s).toUpperCase();case"u":return k(v,10,A,u,t,y,s);case"i":case"d":a=(+v)|0;x=a<0?"-":q;v=x+b(String(Math.abs(a)),y,"0",false);return c(v,x,u,t,s);case"e":case"E":case"f":case"F":case"g":case"G":a=+v;x=a<0?"-":q;m=["toExponential","toFixed","toPrecision"]["efg".indexOf(n.toLowerCase())];C=["toString","toUpperCase"]["eEfFgG".indexOf(n)%2];v=x+Math.abs(a)[m](y);return c(v,x,u,t,s)[C]();default:return B}};return l.replace(g,d)}function str_pad(c,g,f,d){var e="",a;var b=function(l,h){var m="",k;while(m.length<h){m+=l}m=m.substr(0,h);return m};c+="";f=f!==undefined?f:" ";if(d!="STR_PAD_LEFT"&&d!="STR_PAD_RIGHT"&&d!="STR_PAD_BOTH"){d="STR_PAD_RIGHT"}if((a=g-c.length)>0){if(d=="STR_PAD_LEFT"){c=b(f,a)+c}else{if(d=="STR_PAD_RIGHT"){c=c+b(f,a)}else{if(d=="STR_PAD_BOTH"){e=b(f,Math.ceil(a/2));c=e+c+e;c=c.substr(0,g)}}}}return c}function str_repeat(a,b){return new Array(b+1).join(a)}function strcasecmp(c,b){var a=(c+"").toLowerCase();var d=(b+"").toLowerCase();if(a>d){return 1}else{if(a==d){return 0}}return -1}function strcmp(b,a){return((b==a)?0:((b>a)?1:-1))}function strip_tags(a,c){c=(((c||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");var b=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,d=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return a.replace(d,"").replace(b,function(f,e){return c.indexOf("<"+e.toLowerCase()+">")>-1?f:""})}function stripslashes(a){return(a+"").replace(/\\(.?)/g,function(c,b){switch(b){case"\\":return"\\";case"0":return"\u0000";case"":return"";default:return b}})}function stripos(a,d,f){var c=(a+"").toLowerCase();var e=(d+"").toLowerCase();var b=0;if((b=c.indexOf(e,f))!==-1){return b}return false}function stristr(b,c,a){var d=0;b+="";d=b.toLowerCase().indexOf((c+"").toLowerCase());if(d==-1){return false}else{if(a){return b.substr(0,d)}else{return b.slice(d)}}}function strrev(a){a=a+"";var b=/(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;a=a.replace(b,"$2$1");return a.split("").reverse().join("")}function strstr(b,c,a){var d=0;b+="";d=b.indexOf(c);if(d==-1){return false}else{if(a){return b.substr(0,d)}else{return b.slice(d)}}}function strtotime(o,c){var g=o.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);if(g&&g[2]==g[4]){if(g[1]>1901){switch(g[2]){case"-":if(g[3]>12|g[5]>31){return(0)}return new Date(g[1],parseInt(g[3],10)-1,g[5],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break;case".":return(0);break;case"/":if(g[3]>12|g[5]>31){return(0)}return new Date(g[1],parseInt(g[3],10)-1,g[5],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break}}else{if(g[5]>1901){switch(g[2]){case"-":if(g[3]>12|g[1]>31){return(0)}return new Date(g[5],parseInt(g[3],10)-1,g[1],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break;case".":if(g[3]>12|g[1]>31){return(0)}return new Date(g[5],parseInt(g[3],10)-1,g[1],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break;case"/":if(g[1]>12|g[3]>31){return(0)}return new Date(g[5],parseInt(g[1],10)-1,g[3],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break}}else{switch(g[2]){case"-":if(g[3]>12|g[5]>31|(g[1]<70&g[1]>38)){return(0)}var k=g[1]>=0&&g[1]<=38?+g[1]+2000:g[1];return new Date(k,parseInt(g[3],10)-1,g[5],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break;case".":if(g[5]>=70){if(g[3]>12|g[1]>31){return(0)}return new Date(g[5],parseInt(g[3],10)-1,g[1],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000}else{if(g[5]<60&!(g[6])){if(g[1]>23|g[3]>59){return(0)}var l=new Date();return new Date(l.getFullYear(),l.getMonth(),l.getDate(),g[1]||0,g[3]||0,g[5]||0,g[9]||0)/1000}else{return(0)}}break;case"/":if(g[1]>12|g[3]>31|(g[5]<70&g[5]>38)){return(0)}var k=g[5]>=0&&g[5]<=38?+g[5]+2000:g[5];return new Date(k,parseInt(g[1],10)-1,g[3],g[6]||0,g[7]||0,g[8]||0,g[9]||0)/1000;break;case":":if(g[1]>23|g[3]>59|g[5]>59){return(0)}var l=new Date();return new Date(l.getFullYear(),l.getMonth(),l.getDate(),g[1]||0,g[3]||0,g[5]||0)/1000;break}}}}if(o==="now"){return c===null||isNaN(c)?new Date().getTime()/1000|0:c|0}else{if(!isNaN(parse=Date.parse(o))){return parse/1000|0}}var d=c?new Date(c*1000):new Date();var n={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};var a={yea:"FullYear",mon:"Month",day:"Date",hou:"Hours",min:"Minutes",sec:"Seconds"};function e(s,r,p){var q=n[r];if(typeof(q)!=="undefined"){var t=q-d.getDay();if(t===0){t=7*p}else{if(t>0&&s==="last"){t-=7}else{if(t<0&&s==="next"){t+=7}}}d.setDate(d.getDate()+t)}}function b(v){var s=v.split(" ");var t=s[0];var p=s[1].substring(0,3);var u=/\d+/.test(t);var r=s[2]==="ago";var q=(t==="last"?-1:1)*(r?-1:1);if(u){q*=parseInt(t,10)}if(a.hasOwnProperty(p)){return d["set"+a[p]](d["get"+a[p]]()+q)}else{if(p==="wee"){return d.setDate(d.getDate()+(q*7))}}if(t==="next"||t==="last"){e(t,p,q)}else{if(!u){return false}}return true}var m="([+-]?\\d+\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?";g=o.match(new RegExp(m,"gi"));if(!g){return false}for(var f=0,h=g.length;f<h;f++){if(!b(g[f])){return false}}return(d.getTime()/1000)}function substr(l,a,g){var f=0,c=true,n=0,b=0,k=0,h="";l+="";var e=l.length;this.php_js=this.php_js||{};this.php_js.ini=this.php_js.ini||{};switch((this.php_js.ini["unicode.semantics"]&&this.php_js.ini["unicode.semantics"].local_value.toLowerCase())){case"on":for(f=0;f<l.length;f++){if(/[\uD800-\uDBFF]/.test(l.charAt(f))&&/[\uDC00-\uDFFF]/.test(l.charAt(f+1))){c=false;break}}if(!c){if(a<0){for(f=e-1,n=(a+=e);f>=n;f--){if(/[\uDC00-\uDFFF]/.test(l.charAt(f))&&/[\uD800-\uDBFF]/.test(l.charAt(f-1))){a--;n--}}}else{var d=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g;while((d.exec(l))!=null){var m=d.lastIndex;if(m-2<a){a++}else{break}}}if(a>=e||a<0){return false}if(g<0){for(f=e-1,b=(e+=g);f>=b;f--){if(/[\uDC00-\uDFFF]/.test(l.charAt(f))&&/[\uD800-\uDBFF]/.test(l.charAt(f-1))){e--;b--}}if(a>e){return false}return l.slice(a,e)}else{k=a+g;for(f=a;f<k;f++){h+=l.charAt(f);if(/[\uD800-\uDBFF]/.test(l.charAt(f))&&/[\uDC00-\uDFFF]/.test(l.charAt(f+1))){k++}}return h}break}case"off":default:if(a<0){a+=e}e=typeof g==="undefined"?e:(g<0?g+e:g+a);return a>=l.length||a<0||a>e?!1:l.slice(a,e)}return undefined}function trim(e,d){var b,a=0,c=0;e+="";if(!d){b=" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000"}else{d+="";b=d.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1")}a=e.length;for(c=0;c<a;c++){if(b.indexOf(e.charAt(c))===-1){e=e.substring(c);break}}a=e.length;for(c=a-1;c>=0;c--){if(b.indexOf(e.charAt(c))===-1){e=e.substring(0,c+1);break}}return b.indexOf(e.charAt(0))===-1?e:""}function ucwords(a){return(a+"").replace(/^([a-z])|\s+([a-z])/g,function(b){return b.toUpperCase()})}function checkdate(a,b,c){return a>0&&a<13&&c>0&&c<32768&&b>0&&b<=(new Date(c,a,0)).getDate()}function date(l,h){var g=this,k,e,b=/\\?([a-z])/gi,a,c=function(m,f){if((m=m+"").length<f){return new Array((++f)-m.length).join("0")+m}return m},d=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"];a=function(f,m){return e[f]?e[f]():m};e={d:function(){return c(e.j(),2)},D:function(){return e.l().slice(0,3)},j:function(){return k.getDate()},l:function(){return d[e.w()]+"day"},N:function(){return e.w()||7},S:function(){var f=e.j();return f>4||f<21?"th":{1:"st",2:"nd",3:"rd"}[f%10]||"th"},w:function(){return k.getDay()},z:function(){var m=new Date(e.Y(),e.n()-1,e.j()),f=new Date(e.Y(),0,1);return Math.round((m-f)/86400000)+1},W:function(){var m=new Date(e.Y(),e.n()-1,e.j()-e.N()+3),f=new Date(m.getFullYear(),0,4);return c(1+Math.round((m-f)/86400000/7),2)},F:function(){return d[6+e.n()]},m:function(){return c(e.n(),2)},M:function(){return e.F().slice(0,3)},n:function(){return k.getMonth()+1},t:function(){return(new Date(e.Y(),e.n(),0)).getDate()},L:function(){return new Date(e.Y(),1,29).getMonth()===1|0},o:function(){var o=e.n(),f=e.W(),m=e.Y();return m+(o===12&&f<9?-1:o===1&&f>9)},Y:function(){return k.getFullYear()},y:function(){return(e.Y()+"").slice(-2)},a:function(){return k.getHours()>11?"pm":"am"},A:function(){return e.a().toUpperCase()},B:function(){var m=k.getUTCHours()*3600,f=k.getUTCMinutes()*60,n=k.getUTCSeconds();return c(Math.floor((m+f+n+3600)/86.4)%1000,3)},g:function(){return e.G()%12||12},G:function(){return k.getHours()},h:function(){return c(e.g(),2)},H:function(){return c(e.G(),2)},i:function(){return c(k.getMinutes(),2)},s:function(){return c(k.getSeconds(),2)},u:function(){return c(k.getMilliseconds()*1000,6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)"},I:function(){var m=new Date(e.Y(),0),o=Date.UTC(e.Y(),0),f=new Date(e.Y(),6),n=Date.UTC(e.Y(),6);return 0+((m-o)!==(f-n))},O:function(){var f=k.getTimezoneOffset();return(f>0?"-":"+")+c(Math.abs(f/60*100),4)},P:function(){var f=e.O();return(f.substr(0,3)+":"+f.substr(3,2))},T:function(){return"UTC"},Z:function(){return -k.getTimezoneOffset()*60},c:function(){return"Y-m-d\\Th:i:sP".replace(b,a)},r:function(){return"D, d M Y H:i:s O".replace(b,a)},U:function(){return k.getTime()/1000|0}};this.date=function(m,f){g=this;k=((typeof f==="undefined")?new Date():(f instanceof Date)?new Date(f):new Date(f*1000));return m.replace(b,a)};return this.date(l,h)}function gmdate(c,b){var a=typeof b==="undefined"?new Date():typeof b==="object"?new Date(b):new Date(b*1000);b=Date.parse(a.toUTCString().slice(0,-4))/1000;return this.date(c,b)}function idate(e,d){if(e===undefined){throw"idate() expects at least 1 parameter, 0 given"}if(!e.length||e.length>1){throw"idate format is one char"}var c=((typeof d==="undefined")?new Date():(d instanceof Date)?new Date(d):new Date(d*1000)),b;switch(e){case"B":return Math.floor(((c.getUTCHours()*3600)+(c.getUTCMinutes()*60)+c.getUTCSeconds()+3600)/86.4)%1000;case"d":return c.getDate();case"h":return c.getHours()%12||12;case"H":return c.getHours();case"i":return c.getMinutes();case"I":b=c.getFullYear();return 0+(((new Date(b,0))-Date.UTC(b,0))!==((new Date(b,6))-Date.UTC(b,6)));case"L":b=c.getFullYear();return(!(b&3)&&(b%100||!(b%400)))?1:0;case"m":return c.getMonth()+1;case"s":return c.getSeconds();case"t":return(new Date(c.getFullYear(),c.getMonth()+1,0)).getDate();case"U":return Math.round(c.getTime()/1000);case"w":return c.getDay();case"W":b=new Date(c.getFullYear(),c.getMonth(),c.getDate()-(c.getDay()||7)+3);return 1+Math.round((b-(new Date(b.getFullYear(),0,4)))/86400000/7);case"y":return parseInt((c.getFullYear()+"").slice(2),10);case"Y":return c.getFullYear();case"z":return Math.floor((c-new Date(c.getFullYear(),0,1))/86400000);case"Z":return -c.getTimezoneOffset()*60;default:throw"Unrecognized date format token"}}function mktime(){var f=new Date(),b=arguments,a=0,c=["Hours","Minutes","Seconds","Month","Date","FullYear"];for(a=0;a<c.length;a++){if(typeof b[a]==="undefined"){b[a]=f["get"+c[a]]();b[a]+=(a===3)}else{b[a]=parseInt(b[a],10);if(isNaN(b[a])){return false}}}b[5]+=(b[5]>=0?(b[5]<=69?2000:(b[5]<=100?1900:0)):0);f.setFullYear(b[5],b[3]-1,b[4]);f.setHours(b[0],b[1],b[2]);return(f.getTime()/1000>>0)-(f.getTime()<0)}function rand(b,a){var c=arguments.length;if(c===0){b=0;a=2147483647}else{if(c===1){throw new Error("Warning: rand() expects exactly 2 parameters, 1 given")}}return Math.floor(Math.random()*(a-b+1))+b}function time(){return Math.floor(new Date().getTime()/1000)}function updateHeadings(b,c){b.find(".repeat").remove();var d=b.find("thead>tr");var a=b.find("tr:visible");a.each(function(e,f){if(e!=0&&e%c==0&&e!=a.length-1){d.clone().addClass("repeat").addClass("headings").insertAfter(f)}})}function updateColors(b){var a=b.find("tr:visible");a.each(function(c,d){$(d).removeClass("array1").removeClass("array2").addClass("array"+(1+c%2))})};
function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
function htmlDscape(str) {
return String(str)
        .replace(/&amp;/g,'&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g,'<')
        .replace(/&quot;/g,'"')
        .replace(/&#39;/g, "'");
}

function setJsVar(){
    if (typeof LSvar!="undefined" && LSvar instanceof Object == false) {
      bFixNumAuto=1;
      bNumRealValue=0;
      LEMradix=".";
    }
    else {
      bFixNumAuto=LSvar.bFixNumAuto;
      bNumRealValue=LSvar.bNumRealValue;
      LEMradix=LSvar.sLEMradix;
    }
    numRegex = new RegExp('[^-' + LEMradix + '0-9]','g');
    intRegex = new RegExp('[^-0-9]','g');
}

jQuery.fn.progressbar = function(){
    
    return;
    
};

function hashCode(str)
{
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

var Application = {
   initApplication: function () {
   	 
      document.addEventListener("backbutton", Application.onBackKeyDown, false);   
         
      $(document)
        
        .on('pageinit', '#loginPage', function () {
            g_currentPage = 'loginpage';
            Application.initLoginPage();
         })
         .on('pageinit', '#previewSaved', function () {
            g_currentPage = 'previewpage';
            Application.initPreviewPage();
         })
          .on('pageinit', '#menupage', function () {
             g_currentPage = 'menupage';
            var sid = this.getAttribute('data-url').replace(/(.*?)sid=/g, '');
            g_selectedSid = sid;
            Application.initMenuPage(sid);
         })
         .on('pageinit', '#detailsurvey', function () {
            g_currentPage = 'detailpage';
            var sid = this.getAttribute('data-url').replace(/(.*?)sid=/g, '');
            g_selectedSid = sid;
            Application.initDetailSurvey(sid,g_selectedSurveyLang);
            Application.surveySubmitHandling();
            
            closeLoadingSurveyPopup();
            
         })
          .on('pageinit', '#listsurvey', function () {
            console.log('init list page');
            g_currentPage = 'listpage';
            Application.initListPage();
         });
      Application.menuPageTopButtonHandling();
      Application.listPageTopButtonHandling();
      Application.previewPageTopButtonHandling();
      Application.detailPageTopButtonHandling();
      Application.previewMenuItemHandling();
      Application.menuPageButtonHandling();
      Application.openLinksInApp();
      setTimeout(
	    function() {
	      $.mobile.changePage('login.html',{ transition: "none",reverse: false,changeHash: false});
	    }, 1000);
            
      g_loadedFully = true;
      
      $(document).on( "swiperight", '#menupage', Application.swipeActionHandling );
      $(document).on( "swiperight", '#detailsurvey', Application.swipeActionHandling );
      $(document).on( "swiperight", '#previewSaved', Application.swipeActionHandling );
      
      $(document).on('change','#langListing',function(){
           var selectedLanguage = $(this).val();
           var existingSurveyData = Application.loadingASurveyLocal(g_selectedSid, selectedLanguage);
           if(existingSurveyData)
           {
                $('#loadingPopup').popup('open',{history:false});
                
                g_selectedSurveyLang = selectedLanguage;
                
                g_newdata = true;
                
                var questionList = existingSurveyData.posts;

                setTimeout(function(){
                    
                    
                    
                    Application.layoutDetailSurvey(questionList,g_selectedSid,existingSurveyData.jscode, existingSurveyData.jsinput);

                    $('#loadingPopup').popup('close');
                    
                },1000);

                
           }
           else
           {
               if(Application.isConnection())
               {
                   var feedUrl =  window.localStorage.getItem('url');
                   var feedName = window.localStorage.getItem('username');
                   
                   $('#loadingPopup').popup('open',{history:false});
                   
                   $.ajax({
                            url: feedUrl+'/getpublic.php?type=details&user='+feedName+'&SurveyId='+g_selectedSid+"&Language="+selectedLanguage,
                            dataType: 'json',
                           
                            success: function (data) {

                                var empObject = eval('(' + JSON.stringify(data[0]) + ')');
                                if(empObject.result == "SUCCESS" && empObject.code==118)
                                {
                                   g_newdata = true;

                                   g_selectedSurveyLang = selectedLanguage;
                                   
                                    //setting the survey
                                   Application.savingASurveyLocal(data[0],g_selectedSid,selectedLanguage);



                                   Application.layoutDetailSurvey(empObject.posts,g_selectedSid,empObject.jscode, empObject.jsinput);

                                   


                                }
                            },
                            error: function () {
                               
                              
                               navigator.notification.alert('Unable to retrieve the detail of survey for selected language now. Please try again later', function () {
                               }, 'Error');

                               $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});

                            },
                            complete: function () {

                               $('#loadingPopup').popup('close');
                            }});
               }
               else
               {
                    navigator.notification.alert('There is no internet connection. Please check your network connection and try again!', function () {
                           }, 'Error');
               }
           }  
                    
      });
      
     
   },
   swipeActionHandling: function()
   {
       if(g_currentPage == "menupage")
           $.mobile.changePage('list.html',{ transition: "none",reverse: false,changeHash: false});
       else if(g_currentPage == "previewpage")
           $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
       else if(g_currentPage == "detailpage")
       {
           confirmDialog("Cancel Survey","Are you sure you want to cancel?", function(){
               $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
            });
       }
           
   },
   updateRecentURL: function(strURL)
   {
       window.localStorage.setItem("RECENT_SHIBA_SERVICE_URL",strURL);
       
   },
   getRecentURL: function()
   {
       var url = window.localStorage.getItem("RECENT_SHIBA_SERVICE_URL");
       if(url)
           return url;
       return '';
   },
   updateRecentUsername: function(strUsername)
   {
      window.localStorage.setItem("RECENT_SHIBA_USERNAME",strUsername);
   },
   getRecentUsername: function()
   {
        var username = window.localStorage.getItem("RECENT_SHIBA_USERNAME");
        if(username)
            return username;
        return '';
   },
   logout: function()
   {
        g_loggedIn = false;
        $.mobile.changePage('login.html',{ transition: "none",reverse: false,changeHash: false});
   },
   onBackKeyDown: function()
   {
       
       switch(g_currentPage)
       {
           case "previewpage":
           {
               $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
           }
           break;
           case "menupage":
           {
               $.mobile.changePage('list.html',{ transition: "none",reverse: false,changeHash: false});
           }
           break;
           case "detailpage":
           {
               
               if(g_newdata)
                    $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
                else
                    $.mobile.changePage('preview.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
           }
           break;
       }
       
   },
   isConnection: function()
   {
       if(g_loadedFully)
       {
           if (navigator.connection.type != Connection.NONE) {
                return  true;
            }
            return false;
           
       }
       
   },
   initPreviewPage: function(sid)
   {       
       var uaTemp = navigator.userAgent;
       var withText = true;
       if(String(uaTemp).indexOf("Android")>=0 && String(uaTemp).indexOf("Mobile")>=0)
           withText = false;
       var htmlContent = '';
       htmlContent += '<h2 style="text-align: center;">'+Application.getSurveyTitle(g_selectedSid)+'</h2>';
      
       htmlContent += '<ul data-role="listview" data-theme="b" style="margin-bottom: 50px;">';
       var listSavedData = JSON.parse(window.localStorage.getItem('ShibaSavedList_'+g_selectedSid+"_"+g_username));
       if(listSavedData)
       {
            for(var index = 0;index < listSavedData.length;index++)
             {
                  var aSaved =  eval('(' + JSON.stringify(listSavedData[index]) + ')');
                  var savedCode = aSaved.savedcode;
                  htmlContent  += '<li>';
                  htmlContent  += '<h3 class="idPos"> No. '+index+'</h3>';
                  htmlContent  += '<div  data-role="controlgroup" data-type="horizontal">';
                  var createdDate = new Date(aSaved.date);
                  createdDate = createdDate.toString().replace(/UTC\s/,"");
                  createdDate = createdDate.replace(/GMT.+/,"");
                  var updatedDate = new Date(aSaved.update);
                  updatedDate = updatedDate.toString().replace(/UTC\s/,"");
                  updatedDate = updatedDate.replace(/GMT.+/,"");
                  htmlContent  += "Created On "+createdDate;
                  htmlContent  += "<br/>";
                  htmlContent  += "Updated On "+updatedDate;
                  htmlContent  += '<div  class="ui-btn-right">';
                  htmlContent += '<a href="#"  data-savedCode="'+savedCode+'" data-role="button" data-icon="edit" class="split-button-custom EditSavedData" data-inline="true" align="right">'+(withText ? "Edit" : "")+'</a>';
                  htmlContent += '<a href="#"  data-savedCode="'+savedCode+'" data-role="button" data-icon="arrow-u" class="split-button-custom SendSavedData" data-inline="true" align="right">'+(withText ? "Send" : "")+'</a>';
                  htmlContent += '<a href="#"  data-savedCode="'+savedCode+'" data-role="button" data-icon="delete" class="split-button-custom DeleteSavedData" data-inline="true" align="right">'+(withText ? "Delete" : "")+'</a>';
                  htmlContent  += '</div>';
                  htmlContent  += '</div>';
                  htmlContent  += '</li>';
             }
            htmlContent += '</ul>';

            $("#detailPreViewContent").empty();
            $("#detailPreViewContent").append(htmlContent).trigger('create');;
       }
      
   },
   previewMenuItemHandling: function()
   {
       $(document).on("click","a.EditSavedData",function(){
          g_savedCode = $(this).attr('data-savedCode');
          g_newdata = false;
          
          g_selectedSurveyLang = Application.getSavedDataLanguage(g_savedCode);
          
          
          
          openLoadingSurveyPopup();
             
             setTimeout(function () {
          
       
          $.mobile.changePage('detail.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
             },1000);
          
       });
       $(document).on("click","a.SendSavedData",function(){
           
           
           
           console.log('send button clicked');
           g_buttonSendItem = this;
           confirmDialog("Send Survey","Are you sure you want to send "+$(this).parent().parent().parent().parent().children(".idPos").html()+"?", function(){
               
               g_numSend = 0;
               g_isSendAll = false;
               
               
               var savedCode = $(g_buttonSendItem).attr('data-savedCode');
               g_savedCode = savedCode;
               if(Application.isConnection())
               {
                   
                   $('#sendingpopup').popup('open');
                   
                   setTimeout(function(){
                   
                    var savedData = window.localStorage.getItem(savedCode);
                    if(savedData)
                    {
                        savedData = JSON.parse(savedData);
                        
                        g_sendingSurvey = savedData;
                        
                        //Application.submitASurvey(savedData.data);
                        //var feedUrl =  window.localStorage.getItem('url');


                        var $workingItem =  $(g_buttonSendItem).parent().parent().parent().parent();

                        g_surveyPreivewSelectedItem = $workingItem;
                         

                        Application.sendASavedData();

                    }
                },1000);
               }
               else
               {
                   navigator.notification.alert('There is no internet connection. Please check your network connection and try again!', function () {
                           }, 'Error');
               }
               
               
            });
       });
       $(document).on("click","a.DeleteSavedData",function(){
          
           var selectedItem = this;
           confirmDialog("Delete Survey","Are you sure you want to delete "+$(this).parent().parent().parent().parent().children(".idPos").html()+"?", function(){
               
                $('#deletinggpopup').popup('open');
               
                setTimeout(function(){
                
                var savedCode = $(selectedItem).attr('data-savedCode');
                $(selectedItem).parent().parent().parent().parent().nextAll().each(function(){

                     var currentIndex = parseInt($(selectedItem).children(".idPos").html());
                     currentIndex -= 1;
                     $(selectedItem).children(".idPos").empty();
                     $(selectedItem).children(".idPos").html(currentIndex);
                 });
                 console.log($(selectedItem).parent().parent().parent().parent().index());
                  $(selectedItem).parent().parent().parent().parent().remove();
                 $("#detailPreViewContent").trigger('create');
                 Application.deleteARecord(g_selectedSid,g_username,savedCode);
                if(Application.getNumSavedData(g_selectedSid,g_username)<=0)
                {
                    $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
                }
                return false;
            
            },1000);
               
        });
    });
   },
   initMenuPage: function(sid)
   {
       
        var numSavedData = Application.getNumSavedData(g_selectedSid,g_username);
        if(numSavedData > 0)
        {
            
            $('input[id="menupreview"]').val("Preview Saved Data ("+numSavedData+")").button("refresh");
            $('input[id="menusend"]').val("Send All Saved Data ("+numSavedData+")").button("refresh");
           
        }
        else
        {   
            $('input[id="menupreview"]').val("Preview Saved Data").button("refresh");
            $('input[id="menusend"]').val("Send All Saved Data").button("refresh");
        }
        
        if(g_refreshing)
        {
            g_refreshing = false;
            setTimeout(function(){
                
                $('#menurefresh').click();
                
            },500);
            
            
        }
   	
   },
   uploadAFile: function(inputVal, fileURI, surveyID, surveyLang, fieldName)
   {
       
        if(!Application.isConnection())
        {
            navigator.notification.alert('There is no internet connection for uploading file. Please check your network connection and try again!', function () {
                            }, 'Error');
        }
        else
        {
       
            $('#uploadingpopup').popup('open',{ history: false });

            //alert(fileURI.lastIndexOf('/')+1); 

            var feedUrl =   window.localStorage.getItem('url');
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);

            var params = new Object();
            params.surveyid = surveyID;
            params.language = surveyLang;
            params.fieldname = fieldName;
            options.params = params;
            options.chunkedMode = false;


            var ft = new FileTransfer();

            ft.onprogress = function(progressEvent) 
            {
                //alert(progressEvent.loaded / progressEvent.total);
                console.log("uploaded:"+progressEvent.loaded / progressEvent.total);
            };
            ft.upload(fileURI,feedUrl+"/upload.php", function(message){
                // success
               //alert(message.response);
                var returnValue = JSON.parse(message.response);
                //alert(returnValue);
                if(returnValue.success == true)
                {
                    var htmlVal = '[{"title":"","comment":"","size":"'+returnValue.size+'","name":"'+returnValue.name+'","filename":"'+returnValue.filename+'","ext":"'+returnValue.ext+'","platform":"mobileapp"}]';
                    htmlVal = htmlEscape(htmlVal);
                    $(inputVal).val(returnValue.name);

                    $(inputVal).attr('fileURL',htmlVal);

                    //anSurvey.data = anSurvey.data.replace("FILE_"+fieldName+"="+fileURI,fieldName+'='+htmlVal);
                    g_uploadingFile = false;
                }

                 $('#uploadingpopup').popup('close');

            }, function(){

                $('#uploadingpopup').popup('close');
                // fail
                g_uploadingFile = false;
                alert('There is error while uploading file '+fileURI.substr(fileURI.lastIndexOf('/')+1)+'. Please try again later!');
            }, options);
        }
    },
   menuPageButtonHandling: function()
   {
       
       $(document).on("click",'#menuenter',function(){
            
             g_newdata = true;
             
             openLoadingSurveyPopup();
             
             setTimeout(function () {
             
             $.mobile.changePage('detail.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
             },1000);
            
            
        });	
       $(document).on("click",'#menurefresh',function(){
            Application.refreshASurvey(g_selectedSid,g_selectedSurveyLang);
        });
        
       $(document).on("click",'#menupreview',function(){
           
           
            var listSavedData = JSON.parse(window.localStorage.getItem('ShibaSavedList_'+g_selectedSid+"_"+g_username));
            if(listSavedData)
                $.mobile.changePage('preview.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
            else
                navigator.notification.alert('There is no saved data for this survey!', function () {}, 'Error');
           
        });
        
        $(document).on("click",'#menusend',function(){
            
            g_isSendAll = true;
            g_numSend = 0;
            g_total2Send = Application.getNumSavedData(g_selectedSid,g_username);
            
            if(g_total2Send <= 0)
                return;
            
            if(Application.isConnection())
            {
                
               $('#popupSendingAllSurvey').popup('open',{history:false});    
                             
                             
               setTimeout(function () {
                
                
                var listSavedData = window.localStorage.getItem('ShibaSavedList_'+g_selectedSid+"_"+g_username);
              
               
                
                if(listSavedData) 
                {
                     listSavedData = JSON.parse(listSavedData);
                     
                     
                     g_sendingSurveyList = listSavedData;
                     
                     Application.sendAllSavedData();
                 }
                
              },1000);
                 
            }
            else
            {
                navigator.notification.alert('There is no internet connection. Please check your network connection and try again!', function () {
                            }, 'Error');
            }
           
        });
   },
   sendASavedData: function()
   {
       if(g_sendingSurvey)
       {
           var feedUrl =   window.localStorage.getItem('url');
           if(g_sendingSurvey.files && g_sendingSurvey.files.length > 0)
           {
                var aFile = g_sendingSurvey.files.pop();
                var fileURI = aFile.fileURL;
                
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);

                var params = new Object();
                params.surveyid = aFile.sid;
                params.language = aFile.lang;
                params.fieldname = aFile.name;
                options.params = params;
                options.chunkedMode = false;


                var ft = new FileTransfer();

                ft.onprogress = function(progressEvent) 
                {
                    //alert(progressEvent.loaded / progressEvent.total);
                    console.log("uploaded:"+progressEvent.loaded / progressEvent.total);
                };
                ft.upload(fileURI,feedUrl+"/upload.php", function(message){
                    // success
                   //alert(message.response);
                    var returnValue = JSON.parse(message.response);
                    //alert(returnValue);
                    if(returnValue.success == true)
                    {
                        var htmlVal = '[{"title":"","comment":"","size":"'+returnValue.size+'","name":"'+returnValue.name+'","filename":"'+returnValue.filename+'","ext":"'+returnValue.ext+'","platform":"mobileapp"}]';
                        htmlVal = htmlEscape(htmlVal);
                        g_sendingSurvey.data = g_sendingSurvey.data + "&" + aFile.name + "=" + htmlVal +  "&" + aFile.name + "_filecount=1";

                        console.log(g_sendingSurvey.data);
                        //anSurvey.data = anSurvey.data.replace("FILE_"+fieldName+"="+fileURI,fieldName+'='+htmlVal);
                      
                    }

                    Application.sendASavedData();

                    }, function(){

                    Application.sendASavedData();   
                       
                    }, options);
           }
           else
           {
                $.ajax({
                    data: g_sendingSurvey.data+"&latitude="+g_currentLatitude+"&longtitude="+g_currentLongtitude,   
                    async: false,
                    url: feedUrl+'/submitapi.php',
                    //url: feedUrl+'/getpublic.php?user='+g_username,
                    dataType: 'json',
                    success: function(data)
                    {      
                          


                          if(g_isSendAll == false)
                          {
                                g_surveyPreivewSelectedItem.nextAll().each(function(){

                                var currentIndex = parseInt($(g_buttonSendItem).children(".idPos").html());
                                currentIndex -= 1;
                                $(g_buttonSendItem).children(".idPos").empty();
                                $(g_buttonSendItem).children(".idPos").html(currentIndex);
                                });
                                
                                 g_surveyPreivewSelectedItem.remove();
                          }
                          g_numSend ++;

                         

                          Application.deleteARecord(g_selectedSid,g_username,g_savedCode);

                          $.mobile.loading('hide');
                          if(Application.getNumSavedData(g_selectedSid,g_username)<=0 && g_isSendAll == false)
                          {
                             $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
                          }
                         
                          //alert('Your saved was successfully submitted');
                    },
                    error: function()
                    {
                           $('#sendingpopup').popup('close');
                           if(g_isSendAll == false)
                                navigator.notification.alert('Unable to send the saved survey now. Please try again later', function () {
                           }, 'Error');
                    },
                    complete: function()
                    {
                          $('#sendingpopup').popup('close');
                          
                          if(g_isSendAll)
                            Application.sendAllSavedData();
                    }
                });
           }
       }
      
   },
   getSavedDataLanguage: function(saveCode)
   {
       var savedData = window.localStorage.getItem(saveCode);
       if(savedData)
       {
           savedData = JSON.parse(savedData);
           
           return savedData.lang;
       }
       return "en";
   },
   editASavedData: function(saveCode)
   {
       var savedData = window.localStorage.getItem(saveCode);
       if(savedData)
       {
           
           savedData = JSON.parse(savedData);
           var originalData = savedData.original;
           
           Object.keys(originalData).forEach(function(key) {
               var valueKey = originalData[key];
               
               if(key == 'survey_id')
                   return;
               
               $('input[name="java'+key+'"]').each(function(){
                   $(this).val(valueKey);
               });
               $('input[name="'+key+'"]').each(function(){
                   
                   switch($(this).attr('type'))
                   {
                       case 'radio':
                       {
                           if($(this).is('[value="'+valueKey+'"]'))
                           {    
                                $(this).prop('checked',true);
                                $(this).attr('checked','checked');
                                $(this).trigger("click");
                                
                            }
                       }    
                       break;
                       case 'checkbox':
                       {
                             $(this).click();
                       }    
                       break;
                       case 'text':
                       {
                            $(this).val(valueKey);
                           
                       }    
                       break;     
                       case 'afile':
                       {
                          
                           if(String(valueKey).length > 0)
                           {
                                $(this).attr("fileURL",valueKey);
                                $(this).val(valueKey.substr(valueKey.lastIndexOf('/')+1));
                               /*
                                var temp = htmlDscape(valueKey);
                                //alert(temp);
                                $(this).attr("fileURL",temp);
                                temp = JSON.parse(temp);
                                $(this).val(temp[0].name);
                                */
                           }
                       }    
                       break;   
                       case 'number':
                       {
                             $(this).val(valueKey);
                       }    
                       break;  
                       case 'adate':
                       {
                             $(this).val(valueKey);
                       }    
                       break;   
                   }
                   
               });
               $('textarea[name="'+key+'"]').each(function(){
                   $(this).text(valueKey);
               });
                $('select[name="'+key+'"] > option[value="'+valueKey+'"]').prop('selected', true);
                $('select[name="'+key+'"]').selectmenu('refresh', true);
            });
       }
   },
   clearAllSavedData: function(sid, username)
   {
        var listSavedData = window.localStorage.getItem('ShibaSavedList_'+sid+"_"+username);
        if(listSavedData)
        {
            listSavedData = JSON.parse(listSavedData);
            for(var index = 0;index < listSavedData.length;index++)
            {
                 var aSaved =  eval('(' + JSON.stringify(listSavedData[index]) + ')');
                 window.localStorage.removeItem(aSaved.savedcode);
            }
            window.localStorage.removeItem('ShibaSavedList_'+sid+"_"+username);
        }
        
   },
   sendAllSavedData: function()
   {
       
       if(g_sendingSurveyList.length > 0)
       {
            var aSaved =  eval('(' + JSON.stringify(g_sendingSurveyList.pop()) + ')');
            var savedData = window.localStorage.getItem(aSaved.savedcode);
            g_sendingSurvey = JSON.parse(savedData);
            Application.sendASavedData();
       }
       else
       {
           
            $('#popupSendingAllSurvey').popup('close');

                $.mobile.changePage(
                    window.location.href,
                    {
                      allowSamePageTransition : true,
                      transition              : 'none',
                      showLoadMsg             : false,
                      reloadPage              : true
                    }
                  );
                      
               if(g_numSend == g_total2Send - 1)
                    navigator.notification.alert('All your saved data has been submitted successfully.',function () {},'Send All Surveys');
                else
                    navigator.notification.alert(g_numSend + ' your saved data has been submitted successfully.',function () {},'Send All Surveys');
                
                g_sendingSurveyList = {};
       }
   },
   getNumSavedData: function(sid, username)
   {  
      var listSavedData = window.localStorage.getItem('ShibaSavedList_'+sid+"_"+username);
      if(listSavedData)
      {
          console.log(listSavedData);
          listSavedData = JSON.parse(listSavedData);          
          return  listSavedData.length;
      }
      return 0;  
   },
   rankingHandling: function()
   {
	  $('.UpRanking').click(function(){
		  
		  
		  
		  var $currentLiItem = $(this).parent().parent().parent();
		  
		  //var $parent = $currentLiItem.parent();
		  
		  //var qCodeRanking = $currentLiItem.parent().siblings("input.qCodeRanking").attr('value');
		  
		  var lengthCount = $currentLiItem.parent().children('li').length;
		  
		  var $prevLiItem = $currentLiItem.prev();
		  
		   var index = parseInt($prevLiItem.children('div').children('div').children('input').attr('value'));
		   
		   $currentLiItem.children('div').children('div').children('input').attr('value',index);
		   
		   if(index == 1)
		   {
			  $currentLiItem.children('div').children('div').children('a.UpRanking').css('visibility','hidden');	   
		   }
		   else
		   	  $currentLiItem.children('div').children('div').children('a.UpRanking').css('visibility','visible');
		   
		   $currentLiItem.children('div').children('div').children('a.DownRanking').css('visibility','visible');	
		   
		   
		   index += 1;
		   
		   $prevLiItem.children('div').children('div').children('input').attr('value',index);
		   
		   if(index == lengthCount)
		   {
				$prevLiItem.children('div').children('div').children('a.DownRanking').css('visibility','hidden');
		   }
		   else
		   		$prevLiItem.children('div').children('div').children('a.DownRanking').css('visibility','visible');
		   $prevLiItem.children('div').children('div').children('a.UpRanking').css('visibility','visible');
		  
		 
		  
		  console.log($currentLiItem.html());
		  
		 $currentLiItem = $currentLiItem.detach();
		 
		 $currentLiItem.insertBefore($prevLiItem);
		  
		  
	  }); 
	  
	  $('.DownRanking').click(function(){
		  
		  var $currentLiItem = $(this).parent().parent().parent();
		  
		  var $parent = $currentLiItem.parent();
		  
		  var lengthCount = $currentLiItem.parent().children('li').length;
		  
		  var $nextLiItem = $currentLiItem.next();
		  
		  var index = parseInt($nextLiItem.children('div').children('div').children('input').attr('value'));
		   
		   $currentLiItem.children('div').children('div').children('input').attr('value',index);
		  
                   if(index == lengthCount)
		   {
                        console.log('here');
                        $currentLiItem.children('div').children('div').children('a.DownRanking').css('visibility','hidden');	   
		   }
		   else
                        $currentLiItem.children('div').children('div').children('a.DownRanking').css('visibility','visible');
		   
		   $currentLiItem.children('div').children('div').children('a.UpRanking').css('visibility','visible');	
		   
		   
		   index -= 1;
		   
		   $nextLiItem.children('div').children('div').children('input').attr('value',index);
		   
		   if(index == 1)
		   {
                        $nextLiItem.children('div').children('div').children('a.UpRanking').css('visibility','hidden');
		   }
		   else
                        $nextLiItem.children('div').children('div').children('a.UpRanking').css('visibility','visible');
		   $nextLiItem.children('div').children('div').children('a.DownRanking').css('visibility','visible');
		  
		 
		  
		
		  
		 $currentLiItem = $currentLiItem.detach();
		 
		 $currentLiItem.insertAfter($nextLiItem);
		  
	  }); 
   },
   initDetailSurvey: function (sid, lang){
       
       $('#loadingpopup').popup('open',{ history: false });
       
        if(lang === undefined)
        {
            lang = "en";
            g_selectedSurveyLang = lang;
        }
   	var feedUrl =  window.localStorage.getItem('url');
   	var feedName = window.localStorage.getItem('username');
        var existingSurveyData = Application.loadingASurveyLocal(sid, lang);
        
        if(existingSurveyData == null)
        {
        console.log('loading new survey from internet: '+ 'surveyDetail_'+sid+"_"+lang);
   	$.ajax({
	            url: feedUrl+'/getpublic.php?type=details&user='+feedName+'&SurveyId='+sid+"&Language="+lang,
	            dataType: 'json',
	            beforeSend: function () {
	               $.mobile.loading('show', {
                            text: 'Please wait while retrieving the detail of survey...',
                            textVisible: true,
                            textonly: false
	               });
	            },
	            success: function (data) {
                        
	            	var empObject = eval('(' + JSON.stringify(data[0]) + ')');
                        if(empObject.result == "SUCCESS" && empObject.code==118)
                        {
                           
                            //setting the survey
                           Application.savingASurveyLocal(data[0],sid,lang);
                           
                           
                            
                           Application.layoutDetailSurvey(empObject.posts,sid,empObject.jscode, empObject.jsinput);
                            
                           $.mobile.loading('hide');
                           
                           
            		}
	            },
	            error: function () {
                       $.mobile.loading('hide');
	               navigator.notification.alert('Unable to retrieve the detail of survey now. Please try again later', function () {
	               }, 'Error');
                       
                       $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
                       
	            },
	            complete: function () {
	               $.mobile.loading('hide');
                       
                       $('#loadingpopup').popup('close');
	            }});
       }
       else
       {
           
            
          
            var questionList = existingSurveyData.posts;
           
            Application.layoutDetailSurvey(questionList,sid,existingSurveyData.jscode, existingSurveyData.jsinput);
            
           $('#loadingpopup').popup('close');
           
       }
       
       
       
   },
   
   refreshASurvey: function(sid, lang)
   {
       if(Application.isConnection())
       {
           
           $('#refreshingPopup').popup('open',{history:false});
           
           var feedUrl =   window.localStorage.getItem('url');
           $.ajax({
	            url: feedUrl+'/getpublic.php?type=details&user='+g_username+'&SurveyId='+sid+"&Language="+lang,
	            dataType: 'json',
                    
	            
	            success: function (data) {
	            	var empObject = eval('(' + JSON.stringify(data[0]) + ')');
                        if(empObject.result == "SUCCESS" && empObject.code==118)
                        {
                            //setting the survey
                           Application.savingASurveyLocal(data[0],sid,lang);
                            
                            
                             
            		}
	            },
	            error: function () {
                       $('#refreshingPopup').popup('close');
	               navigator.notification.alert('Unable to update survey now. Please try again later', function () {
	               }, 'Error');
                       
	            },
	            complete: function () {
	               $('#refreshingPopup').popup('close');
	            }});
           
       }
       else
       {
            navigator.notification.alert('There is no internet connection. Please check your network connection and try again!', function () {
	               }, 'Error');
       }
       
   },
   
   savingASurveyLocal: function(questions, sid, lang){
        console.log('save local survey: '+ 'surveyDetail_'+sid+"_"+lang);
        window.localStorage.removeItem('surveyDetail_'+sid+"_"+lang);
        window.localStorage.setItem('surveyDetail_'+sid+"_"+lang,JSON.stringify(questions));
   },
   
   loadingASurveyLocal: function(sid,lang){
         console.log('loading local survey: '+ 'surveyDetail_'+sid+"_"+lang);
         return JSON.parse(window.localStorage.getItem('surveyDetail_'+sid+"_"+lang));      
   },   
   applySavedDetailSurvey: function()
   {
   
   },
   layoutDetailSurvey: function(returnData, sid, jscode, relevance){
                //$('#loadingnoneup').noneup('open');
                
   		var listLanguage = Application.getLanguageList(sid);
                
                
                
   		var htmlContent = '';
   		var $detailContent = $('#surveyDetail');
   		$detailContent.html("");
                
                $detailContent.nextAll().remove();

                
   		htmlContent += '<h2 style="text-align: center;">'+Application.getSurveyTitle(sid)+'</h2>';
   		if(listLanguage)
   		{
   			var listLang = listLanguage.split(',');
                        
   			if(listLang.length>=1)
   			{
   				htmlContent += '<div style="float:right" id="langSwitching">';
                                
				htmlContent += '<select id="langListing" name="langListing" data-native-menu="true" data-iconpos="right" data-inline="">';
                                htmlContent += '<option value="en" '+(g_selectedSurveyLang == "en"?"selected":"")+'>English</option>';
   				for(var index=0;index < listLang.length; index++)
				{
                                        if(String(listLang[index]).trim().length <= 0)
                                            continue;
					htmlContent += '<option value="'+listLang[index]+'" '+(g_selectedSurveyLang == listLang[index]?"selected":"")+'>';
					switch(listLang[index])
					{
						
                                                case "af":
                                                    htmlContent += "Afrikaans";
                                                    break;
                                                case "sq":
                                                    htmlContent += "Albanian";
                                                    break;
                                                case "am": 
                                                    htmlContent += "Amharic";
                                                    break;
                                                case "ar":
                                                    htmlContent += "Arabic";
                                                    break;
                                                case "hy":
                                                    htmlContent += "Armenian";
                                                    break;
                                                case "eu":
                                                    htmlContent += "Basque";
                                                    break;
                                                case "be":
                                                    htmlContent += "Belarusian";
                                                    break;
                                                case "bs": 
                                                    htmlContent += "Bosnian";
                                                    break;
                                                case "bg": 
                                                    htmlContent += "Bulgarian";
                                                    break;
                                                case "ca":
                                                    htmlContent += "Catalan";
                                                    break;
                                                case "ca-valencia":
                                                    htmlContent += "Catalan (Valencian)";
                                                    break;
                                                case "zh-Hans":
                                                    htmlContent += "Chinese (Simplified)";
                                                    break;
                                                case "zh-Hant-HK":
                                                    htmlContent += "Chinese (Traditional; Hong Kong)";
                                                    break;
                                                case "zh-Hant-TW":
                                                    htmlContent += "Chinese (Traditional; Taiwan)";
                                                    break;
                                                case "hr":
                                                    htmlContent += "Croatian";
                                                    break;
                                                case "cs":
                                                    htmlContent += "Czech";
                                                    break;
                                                case "cs-informal":
                                                    htmlContent += "Czech (informal)";
                                                    break;
                                                case "da":
                                                    htmlContent += "Danish";
                                                    break;
                                                case "prs":
                                                    htmlContent += "Dari";
                                                    break;
                                                case "nl":
                                                    htmlContent += "Dutch";
                                                    break;
                                                case "nl-informal":
                                                    htmlContent += "Dutch (informal)";
                                                    break;
                                                case "et":
                                                    htmlContent += "Estonian";
                                                    break;
                                                case "fi":
                                                    htmlContent += "Finnish";
                                                    break;
                                                case "fr":
                                                    htmlContent += "French";
                                                    break;
                                                case "ful":
                                                    htmlContent += "Fula";
                                                    break;
                                                case "gl":
                                                    htmlContent += "Galician";
                                                    break;
                                                case "ka":
                                                    htmlContent += "Georgian";
                                                    break;
                                                case "de":
                                                    htmlContent += "German";
                                                    break;
                                                case "de-informal":
                                                    htmlContent += "German (informal)";
                                                    break;
                                                case "el":
                                                    htmlContent += "Greek";
                                                    break;
                                                case "gu":
                                                    htmlContent += "Gujarati";
                                                    break;
                                                case "he":
                                                    htmlContent += "Hebrew";
                                                    break;
                                                case "hi":
                                                    htmlContent += "Hindi";
                                                    break;
                                                case "hu":
                                                    htmlContent += "Hungarian";
                                                    break;
                                                case "is":
                                                    htmlContent += "Icelandic";
                                                    break;
                                                case "id":
                                                    htmlContent += "Indonesian";
                                                    break;
                                                case "ie":
                                                    htmlContent += "Irish";
                                                    break;
                                                case "it":
                                                    htmlContent += "Italian";
                                                    break;
                                                case "it-informal":
                                                    htmlContent += "Italian (informal)";
                                                    break;
                                                case "ja":
                                                    htmlContent += "Japanese";
                                                    break;
                                                case "rw":
                                                    htmlContent += "Kinyarwanda";
                                                    break;
                                                case "ko":
                                                    htmlContent += "Korean";
                                                    break;
                                                case "ckb":
                                                    htmlContent += "Kurdish (Sorani)";
                                                    break;
                                                case "lv":
                                                    htmlContent += "Latvian";
                                                    break;
                                                case "lt":
                                                    htmlContent += "Lithuanian";
                                                    break;
                                                case "mk":
                                                    htmlContent += "Macedonian";
                                                    break;
                                                case "ms":
                                                    htmlContent += "Malay";
                                                    break;
                                                case "mt":
                                                    htmlContent += "Maltese";
                                                    break;
                                                case "mr":
                                                    htmlContent += "Marathi";
                                                    break;
                                                case "mn":
                                                    htmlContent += "Mongolian";
                                                    break;
                                                case "nb":
                                                    htmlContent += "Norwegian (Bokmal)";
                                                    break;
                                                case "nn":
                                                    htmlContent += "Norwegian (Nynorsk)";
                                                    break;
                                                case "oc":
                                                    htmlContent += "Occitan";
                                                    break;
                                                case "ps":
                                                    htmlContent += "Pashto";
                                                    break;
                                                case "fa":
                                                    htmlContent += "Persian";
                                                    break;
                                                case "pl":
                                                    htmlContent += "Polish";
                                                    break;
                                                case "pt":
                                                    htmlContent += "Portuguese";
                                                    break;
                                                case "pt-BR":
                                                    htmlContent += "Portuguese (Brazilian)";
                                                    break;
                                                case "pa":
                                                    htmlContent += "Punjabi";
                                                    break;
                                                case "ro":
                                                    htmlContent += "Romanian";
                                                    break;
                                                case "ru":
                                                    htmlContent += "Russian";
                                                    break;
                                                case "sr":
                                                    htmlContent += "Serbian (Cyrillic)";
                                                    break;
                                                case "sr-Latn":
                                                    htmlContent += "Serbian (Latin)";
                                                    break;
                                                case "si":
                                                    htmlContent += "Sinhala";
                                                    break;
                                                case "sk":
                                                    htmlContent += "Slovak";
                                                    break;
                                                case "sl":
                                                    htmlContent += "Slovenian";
                                                    break;
                                                case "es":
                                                    htmlContent += "Spanish";
                                                    break;
                                                case "es-AR":
                                                    htmlContent += "Spanish (Argentina)";
                                                    break;
                                                case "es-AR-informal":
                                                    htmlContent += "Spanish (Argentina) (Informal)";
                                                    break;
                                                case "es-CL":
                                                    htmlContent += "Spanish (Chile)";
                                                    break;
                                                case "es-MX":
                                                    htmlContent += "Spanish (Mexico)";
                                                    break;
                                                case "swh":
                                                    htmlContent += "Swahili";
                                                    break;
                                                case "sv":
                                                    htmlContent += "Swedish";
                                                    break;
                                                case "ta":
                                                    htmlContent += "Tamil";
                                                    break;
                                                case "th":
                                                    htmlContent += "Thai";
                                                    break;
                                                case "tr":
                                                    htmlContent += "Turkish";
                                                    break;
                                                case "ur":
                                                    htmlContent += "Urdu";
                                                    break;
                                                case "vi":
                                                    htmlContent += "Vietnamese";
                                                    break;
                                                case "cy":
                                                    htmlContent += "Welsh";
                                                    break;
                                                case "zu":
                                                    htmlContent += "Zulu";
                                                    break;
					}
				}
				htmlContent += '</select></div><div style="clear:both"></div>';
   			}
   		}		
		
		
		htmlContent += '<input type="hidden" name="survey_id" value="'+sid+'">';
                htmlContent += '<input type="hidden" name="survey_lang" value="'+g_selectedSurveyLang+'">';
		
		htmlContent += Application.analyzeData(returnData,sid);
		
                
                
                
                if(relevance)
                {
                
                    var relevanceHidden = relevance;

                    Object.keys(relevanceHidden).forEach(function(key) {
                        var valueKey = relevanceHidden[key];
                        htmlContent += '<input type="hidden" name="'+key+'" id="'+key+'" value="'+valueKey+'">';

                    });
                }
               
               
               
               
		
		$detailContent.append(htmlContent);
		$detailContent.trigger('create');
                
                
		
               Application.rankingHandling();
               
               var dateJS = 'function doPopupDate(qId){ } function doDropDownDate(qId){ } function setPickerOptions(input){ } function validateInput(basename){ } function dateUpdater(){ } function pad(str, max){ } function ValidDate(oObject, value){ }';
               window.eval(dateJS);
               var dualscaleJS = 'function doDualScaleRadio(qID){ } function doDualScaleDropDown(qID){ }';
               window.eval(dualscaleJS);
               var modalJS = 'function getQueryVariable(variable, url){ return; } function isValueInArray(arr, val) { return; } function displayUploadedFiles(jsonstring, filecount, fieldname, show_title, show_comment, pos) { return; } function copyJSON(jsonstring, filecount, fieldname, show_title, show_comment, pos) { return; } function showBasic() { return; } function hideBasic() { }';
               window.eval(modalJS);
               var multipleChoice = 'function doMultipleChoiceWithComments(qID,when) { }';
               window.eval(multipleChoice);
               var rankJS = 'function doDragDropRank(qID, showpopups, samechoiceheight, samelistheight) { } function updateDragDropRank(qID) { } function sortableAlert (qID,showpopups) { } function loadDragDropRank(qID){ } function fixChoiceListHeight(qID,samechoiceheight,samelistheight){ }';
               window.eval(rankJS);
               
               var temp2 = 'function setJsVar(){ if (typeof LSvar!=&quot;undefined&quot; &amp;&amp; LSvar instanceof Object == false) { bFixNumAuto=1; bNumRealValue=0; LEMradix=&quot;.&quot;; } else { bFixNumAuto=LSvar.bFixNumAuto; bNumRealValue=LSvar.bNumRealValue; LEMradix=LSvar.sLEMradix; } numRegex = new RegExp(&#39;[^-&#39; + LEMradix + &#39;0-9]&#39;,&#39;g&#39;); intRegex = new RegExp(&#39;[^-0-9]&#39;,&#39;g&#39;);}function checkconditions(value, name, type, evt_type){ if (typeof evt_type === &#39;undefined&#39;) { evt_type = &#39;onchange&#39;; } if (type == &#39;radio&#39; || type == &#39;select-one&#39;) { $(&#39;#java&#39;+name).val(value); } else if (type == &#39;checkbox&#39;) { if ($(&#39;#answer&#39;+name).is(&#39;:checked&#39;)) { $(&#39;#java&#39;+name).val(&#39;Y&#39;); } else { $(&#39;#java&#39;+name).val(&#39;&#39;); } } else if (type == &#39;text&#39;) { $(&#39;#java&#39;+name).val(value); } if($.isFunction(ExprMgr_process_relevance_and_tailoring )) ExprMgr_process_relevance_and_tailoring(evt_type,name,type); else console.log(&#39;there is no function&#39;); }function fixnum_checkconditions(value, name, type, evt_type, intonly){ newval = new String(value); if(!bNumRealValue) { if (typeof intonly !==&#39;undefined&#39; &amp;&amp; intonly==1) { newval = newval.replace(intRegex,&#39;&#39;); } else { newval = newval.replace(numRegex,&#39;&#39;); } aNewval = newval.split(LEMradix); if(aNewval.length&gt;0){ newval=aNewval[0]; } if(aNewval.length&gt;1){ newval=newval+&quot;.&quot;+aNewval[1]; } if (newval != &#39;-&#39; &amp;&amp; newval != &#39;.&#39; &amp;&amp; newval != &#39;-.&#39; &amp;&amp; newval != parseFloat(newval)) { newval = &#39;&#39;; } } if(bFixNumAuto) { displayVal = newval; if (LEMradix === &#39;,&#39;) { displayVal = displayVal.split(&#39;.&#39;).join(&#39;,&#39;); } if (name.match(/other$/)) { $(&#39;#answer&#39;+name+&#39;text&#39;).val(displayVal); } $(&#39;#answer&#39;+name).val(displayVal); } if (typeof evt_type === &#39;undefined&#39;) { evt_type = &#39;onchange&#39;; } checkconditions(newval, name, type, evt_type);}function manageIndex(){ $(&quot;#index .jshide&quot;).hide(); $(&quot;#index&quot;).on(&#39;click&#39;,&#39;li,.row&#39;,function(e){ if(!$(e.target).is(&#39;button&#39;)){ $(this).children(&quot;[name=&#39;move&#39;]&quot;).click(); } }); $(function() { $(&quot;.outerframe&quot;).addClass(&quot;withindex&quot;); var idx = $(&quot;#index&quot;); var row = $(&quot;#index .row.current&quot;); if(row.length) idx.scrollTop(row.position().top - idx.height() / 2 - row.height() / 2); });}function addClassEmpty(){	$(&#39;input.text[value=&quot;&quot;]&#39;).addClass(&#39;empty&#39;);	$(&#39;input[type=text][value=&quot;&quot;]&#39;).addClass(&#39;empty&#39;);	$(&#39;textarea&#39;).each(function(index) {	if ($(this).val() == &quot;&quot;){		$(this).addClass(&#39;empty&#39;);	}	});	$(&quot;body&quot;).delegate(&quot;input[type=text],textarea&quot;,&quot;blur focusout&quot;,function(){	if ($(this).val() == &quot;&quot;){		$(this).addClass(&#39;empty&#39;);	}else{		$(this).removeClass(&#39;empty&#39;);	}	});}Array.prototype.push = function(){	var n = this.length &gt;&gt;&gt; 0;	for (var i = 0; i &lt; arguments.length; i++)	{		this[n] = arguments[i];		n = n + 1 &gt;&gt;&gt; 0;	}	this.length = n;	return n;};Array.prototype.pop = function() {	var n = this.length &gt;&gt;&gt; 0, value;	if (n) {		value = this[--n];		delete this[n];	}	this.length = n;	return value;};function inArray(needle, haystack){	for (h in haystack)	{		if (haystack[h] == needle)		{			return true;		}	}	return false;}function match_regex(testedstring,str_regexp){		if (str_regexp == &#39;&#39; || testedstring == &#39;&#39;) return false;	pattern = new RegExp(str_regexp);	return pattern.test(testedstring)}function addHiddenField(theform,thename,thevalue){	var myel = document.createElement(&#39;input&#39;);	myel.type = &#39;hidden&#39;;	myel.name = thename;	theform.appendChild(myel);	myel.value = thevalue;}function cancelBubbleThis(eventObject){	if (!eventObject) var eventObject = window.event;	eventObject.cancelBubble = true;	if (eventObject &amp;&amp; eventObject.stopPropagation) {		eventObject.stopPropagation();	}}function cancelEvent(e){ e = e ? e : window.event; if(e.stopPropagation) e.stopPropagation(); if(e.preventDefault) e.preventDefault(); e.cancelBubble = true; e.cancel = true; e.returnValue = false; return false;}function hookEvent(element, eventName, callback){ if(typeof(element) == &quot;string&quot;) element = document.getElementById(element); if(element == null) return; if(element.addEventListener) { element.addEventListener(eventName, callback, false); } else if(element.attachEvent) element.attachEvent(&quot;on&quot; + eventName, callback);}function noScroll(e){ e = e ? e : window.event; cancelEvent(e);}function getkey(e){ if (window.event) return window.event.keyCode; else if (e) return e.which; else return null;}function goodchars(e, goods){ return false;}function show_hide_group(group_id){	var questionCount;	$(&quot;#group-&quot; + group_id).show();questionCount=$(&quot;div#group-&quot; + group_id).find(&quot;div[id^=&#39;question&#39;]:visible&quot;).size();		if( questionCount == 0 )		{			$(&quot;#group-&quot; + group_id).hide();		}}function round (value, precision, mode) { var m, f, isHalf, sgn; precision |= 0; m = Math.pow(10, precision); value *= m; sgn = (value &gt; 0) | -(value &lt; 0); isHalf = value % 1 === 0.5 * sgn; f = Math.floor(value); if (isHalf) { switch (mode) { case &#39;PHP_ROUND_HALF_DOWN&#39;: value = f + (sgn &lt; 0); break; case &#39;PHP_ROUND_HALF_EVEN&#39;: value = f + (f % 2 * sgn); break; case &#39;PHP_ROUND_HALF_ODD&#39;: value = f + !(f % 2); break; default: value = f + (sgn &gt; 0); } } return (isHalf ? value : Math.round(value)) / m;}function maxlengthtextarea(){ $(&quot;textarea[maxlength]&quot;).change(function(){ var maxlen=$(this).attr(&quot;maxlength&quot;); if ($(this).val().length &gt; maxlen) { $(this).val($(this).val().substring(0, maxlen)); } }); $(&quot;textarea[maxlength]&quot;).keyup(function(){ var maxlen=$(this).attr(&quot;maxlength&quot;); if ($(this).val().length &gt; maxlen) { $(this).val($(this).val().substring(0, maxlen)); } }); $(&quot;textarea[maxlength]&quot;).keydown(function(event){ var maxlen=$(this).attr(&quot;maxlength&quot;); var k =event.keyCode; if (($(this).val().length &gt;= maxlen) &amp;&amp; !(k == null ||k==0||k==8||k==9||k==13||k==27||k==37||k==38||k==39||k==40||k==46)) {  return false; } });}';               

              
                
                temp2 = htmlDscape(temp2);
                
                window.eval(temp2);
              
               if(jscode) 
               {
                  
                   var temp = jscode;
                  
                   temp = htmlDscape(temp);
                  // writeFileFromSDCard(temp);
                   window.eval(temp);
               }
               
               $('.survey_fixcheckcondition').each(function(){
                   
                   if($(this).hasClass("change"))
                       $(this).on("change",function(event){
                           fixnum_checkconditions($(this).val(),$(this).attr('name'),$(this).attr("type"),'change');
                       });
                   else if($(this).hasClass("keyup"))
                       $(this).on("keyup",function(event){
                           fixnum_checkconditions($(this).val(),$(this).attr('name'),$(this).attr("type"),'keyup');
                       });
               });
               
               $('.survey_checkcondition').each(function(){
                   
                   if($(this).hasClass("change"))
                       $(this).on("change",function(event){
                           checkconditions($(this).val(),$(this).attr('name'),$(this).attr("type"),'change');
                       });
                   else if($(this).hasClass("keyup"))
                       $(this).on("keyup",function(event){
                            checkconditions($(this).val(),$(this).attr('name'),$(this).attr("type"),'keyup');
                       });
                   else if($(this).hasClass("clickevent"))
                       $(this).on("click",function(event){
                           checkconditions($(this).val(),$(this).attr('name'),$(this).attr("type"),'click');
                       });
               });
            
                if(g_newdata == false)
                {
                    

                    Application.editASavedData(g_savedCode);

                    setTimeout(function(){ closeLoadingSurveyPopup();},2000);
                   
                }
                else
                {
                    setTimeout(function(){ closeLoadingSurveyPopup();},2000);
                }
                   
                
                checkconditions();
                
               $('#surveySubmit').append('<input type="submit" value="Save"/>');
               $('#surveySubmit').trigger('create');
                
	
   },
   listPageTopButtonHandling: function(){
     $(document).on('click',"#logoutButtonList",function(){
        console.log('logout clicked');
        Application.logout();
           
         return false;
         
     });  
     $(document).on('click',"#backButtonList",function(){
         console.log('back Button List');
         
         
     });
     $(document).on('click',"#refreshButtonList",function(){
        console.log('refresh Button List');
        if(Application.isConnection())
        {
            
            
                             
            g_forceRefreshListSurvey = true;
           
            Application.initListPage();
            
            
        }
        else
        {
            navigator.notification.alert('There is no internet connection. Please check your network connection and try again!', function () {}, 'Error');
        }
         
     });
   },
   menuPageTopButtonHandling: function(){
       $(document).on('click',"#logoutButtonMenu",function(){
         console.log('logout clicked');
        Application.logout();
           
         return false;
         
     });
     $(document).on('click',"#returnButtonMenu",function(){
         
         $.mobile.changePage('list.html',{ transition: "none",reverse: false,changeHash: false});

           
         return false;
         
     });
     $(document).on('click',"#refreshButtonMenu",function(){
         
        Application.refreshASurvey(g_selectedSid,g_selectedSurveyLang);
           
         return false;
         
     });
   },
   previewPageTopButtonHandling: function(){
       $(document).on('click',"#logoutButtonPreview",function(){
        
        Application.logout();
           
        return false;
         
     });
     $(document).on('click',"#deleteAllButtonPreview",function(){
        
        Application.clearAllSavedData(g_selectedSid,g_username);
        $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});   
        return false;
     
     });
     $(document).on('click',"#backButtonPreview",function(){
        console.log('backpreview clicked');
        
        $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});
           
         return false;
     
     });
   },
   detailPageTopButtonHandling: function(){
       $(document).on('click',"#logoutButtonDetail",function(){
         console.log('logout clicked');
        Application.logout();
           
            return false;
         
     });
     
     $(document).on('click',"#cancelButtonDetail",function(){
             
             $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});

            
             return false;
         
     });
     
     $(document).on('click',"#refreshButtonDetail",function(){
             
             
             $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});

             g_refreshing = true;
              
            
             return false;
         
     });
   },
   surveySubmitHandling: function()
   {
        $('#surveySubmit').submit(function (event) 
        {
            
            $('#savingPopup').popup('open',{ history: false });
            
            
            event.preventDefault();
            
            var numMandatoryNotFilled = 0;
            
            $(".anMandatory").each(function(){
                var valueInput = $(this).val();
                valueInput = valueInput.trim();
                
                if(valueInput.length == 0)
                {
                    $(this).parentsUntil('div.wrapContent').parent().next('div.mandatory').removeClass('hiddenError');
                    $(this).parentsUntil('div.wrapContent').parent().next('div.mandatory').blur();
                    numMandatoryNotFilled++;
                }
                else
                {
                    $(this).parentsUntil('div.wrapContent').parent().next('div.mandatory').addClass('hiddenError');
                    $(this).parentsUntil('div.wrapContent').parent().next('div.mandatory').blur();

                }
                
            });
            if(numMandatoryNotFilled !=0)
            {
                 $('#savingPopup').popup('close');
                navigator.notification.alert('One or more mandatory questions have not been answered. You cannot proceed until these have been completed.', function () {}, 'Error');
            }
            else
            {
                  
                var files = JSON.parse('[]');
                $('.fileType').each(function(){
                    
                    if(String($(this).attr("fileURL")).length >0)
                    {
                        
                        $(this).val($(this).attr("fileURL"));
                        files.push({"fileURL":$(this).attr("fileURL"),"sid":g_selectedSid,"lang":g_selectedSurveyLang,"name":$(this).attr("name")});
                    }
                    
                });

                $('.rankingInputOrder').each(function(index, element) 
                {

                      var keyName = $(this).attr("name");

                      var keyValue = $(this).attr("value");

                      var splitKey = keyName.split("_SHIBASURVEYRANK_");

                      var newKeyName = splitKey[0] + '' + keyValue;

                      var newKeyValue = splitKey[1];

                      $(this).attr("name",newKeyName);

                      $(this).attr("value",newKeyValue);

                });


                $(".ShibaSurveyMSelection").each(function(index, element) {
                        if($(this).is(':checked'))
                            $(this).attr("value","Y");

                });

                $(".ShibaSurveyPSelection").each(function(index, element) {
                        if($(this).is(':checked'))
                            $(this).attr("value","Y");
                });

                var getDataOriginal = $("#surveySubmit").serializeJSON();
//                $('.fileType').each(function(){
//                    $(this).attr("name","FILE_"+$(this).attr("name"));
//                    
//                });

                 $('.fileType').remove();

                var getData = $(this).serialize();
				
				
				 navigator.geolocation.getCurrentPosition(function(position){
          
                    g_currentLatitude = position.coords.latitude;
                    g_currentLongtitude = position.coords.longitude;
                    
                    getData += "&latitude="+g_currentLatitude+"&longtitude="+g_currentLongtitude;
                    
                     if(g_newdata)
                        Application.saveANewRecord(g_selectedSid,g_username,getData,getDataOriginal,g_selectedSurveyLang,files);
                    else
                        Application.updateARecord(g_selectedSid,g_username,g_savedCode,getData,getDataOriginal,files);


                    g_newdata = true;

                    $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});

                    $('#savingPopup').popup('close');

                }, function(){
                    
                    
                     if(g_newdata)
                        Application.saveANewRecord(g_selectedSid,g_username,getData,getDataOriginal,g_selectedSurveyLang,files);
                    else
                        Application.updateARecord(g_selectedSid,g_username,g_savedCode,getData,getDataOriginal,files);


                    g_newdata = true;

                    $.mobile.changePage('menu.html?sid='+g_selectedSid,{ transition: "none",reverse: false,changeHash: false});

                    $('#savingPopup').popup('close');
                    
                },{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
				
            }
            return false;

        });
   },
   submitASurvey: function(surveyData)
   {
        if(Application.isConnection())
        {
            var feedUrl =  window.localStorage.getItem('url');

            
           
            //console.log('starting submit data:'+feedUrl+'/submitapi.php?'+surveyData);
           
            var result = false;
            $.ajax({
                  data: surveyData,                 
                  
                  async: false,
                  url: feedUrl+'/submitapi.php',
                  //url: feedUrl+'/getpublic.php?user='+g_username,
                  dataType: 'json',
                  success: function(data)
                  {      
                    result =  true;
                    console.log('submit ok');
                  },
                  error: function()
                  {
                    console.log('submit false');     
                    result =  false;
                  }
          });
          return false;
      }
      else
      {
          //navigator.notification.alert('There is no internet connection. Please check your network connection and try again!', function () {}, 'Error');
          return false;
      }
   },
   getSavedCode: function()
   {
       var index = window.localStorage.getItem('savedIndex');
       if(index)
       {
           index = parseInt(index);
           index += 1;
           window.localStorage.setItem('savedIndex',index);
       }
       else
       {
           index = 0;
           window.localStorage.setItem('savedIndex',index);
       }
       return index;       
   },
   saveACode: function(sid, username)
   {
       var aSavedList =  window.localStorage.getItem('ShibaSavedList_'+sid+"_"+username);
       var savedCode = '';
       if(aSavedList)
       {
            aSavedList = JSON.parse(aSavedList);
            savedCode = "SavedData_"+Application.getSavedCode();
            var createdTime = $.now();
            aSavedList.push({"savedcode":savedCode,"date":createdTime,"update":createdTime});
            window.localStorage.setItem('ShibaSavedList_'+sid+"_"+username, JSON.stringify(aSavedList));
            
       }
       else
       {
            aSavedList = {};
            savedCode = "SavedData_"+Application.getSavedCode();
            aSavedList['savedcode']=savedCode;
            var createdTime = $.now()
            aSavedList['date']= createdTime;
            aSavedList['update']= createdTime;
            window.localStorage.setItem('ShibaSavedList_'+sid+"_"+username, "["+JSON.stringify(aSavedList)+"]");
       }
       return savedCode;
   },
   saveANewRecord: function(sid,username,data,originalData,language,files)
   {
       var savedCode = Application.saveACode(sid,username);
       var aSavedData = {"lang":language,"sid":sid,"data":data,"original":originalData,"files":files};
       window.localStorage.setItem(savedCode,JSON.stringify(aSavedData));
       
   },
   updateARecord: function(sid,username,savedCode,data,originalData,files)
   {
       var savedData = window.localStorage.getItem(savedCode);
       savedData = JSON.parse(savedData);
       savedData.data = data;
       savedData.original = originalData;
       savedData.files = files;
       window.localStorage.removeItem(savedCode);
       window.localStorage.setItem(savedCode,JSON.stringify(savedData));
       
       var listSavedData = JSON.parse(window.localStorage.getItem('ShibaSavedList_'+sid+"_"+username));
       for(var index=0;index < listSavedData.length; index++)
        {
                var aSaved =  eval('(' + JSON.stringify(listSavedData[index]) + ')');
                if(aSaved.savedcode == savedCode)
                {
                    aSaved.update = $.now();
                    console.log(aSaved.update);
                    console.log(aSaved.date);
                    listSavedData[index] = aSaved;
                    break;
                }
        }
        window.localStorage.setItem('ShibaSavedList_'+sid+"_"+username,JSON.stringify(listSavedData));
       
   },
   deleteARecord: function(sid, username, savedCode)
   {
       window.localStorage.removeItem(savedCode);
       
       var listSavedData = window.localStorage.getItem('ShibaSavedList_'+sid+"_"+username);
       if(listSavedData)
       {
            listSavedData = JSON.parse(listSavedData);
            var itemIndex = 0;
            for(var index=0;index < listSavedData.length; index++)
            {
                    var aSaved =  eval('(' + JSON.stringify(listSavedData[index]) + ')');
                    if(aSaved.savedcode == savedCode)
                    {
                        itemIndex = index;                    
                        break;
                    }
            }

            listSavedData.splice(itemIndex,1);
            console.log(JSON.stringify(listSavedData));
            window.localStorage.setItem('ShibaSavedList_'+sid+"_"+username,JSON.stringify(listSavedData));
        }
   },
   compare: function(a,b) 
   {
        a =  eval('(' + JSON.stringify(a)+ ')');
        b =  eval('(' + JSON.stringify(b)+ ')');
        if (parseInt(a.qid) < parseInt(b.qid))
           return -1;
        if (parseInt(a.qid) > parseInt(b.qid))
          return 1;
        return 0;
   },
   analyzeData: function (returnData,sid){
		var htmlItems = '';
               // returnData.sort(Application.compare);
		for(var index=0;index < returnData.length; index++)
		{
			var anQuestion =  eval('(' + JSON.stringify(returnData[index]) + ')');
			htmlItems  += Application.analyzeAnQuestion(anQuestion,sid);
			htmlItems  += '<div style="clear:both">&nbsp;</div>';
		}
	   	return htmlItems;
	},
	analyzeAnQuestion: function (anQuestion,sid){
		
		var htmlItems = '';
		
		htmlItems += '<div id="question'+anQuestion.qid+'">';
		
                
                
		switch(anQuestion.type)
		{
			case "5":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                
                                
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
                                
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><fieldset data-role="controlgroup" data-type="horizontal">';
			
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"   id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'1" value="1"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'1">1</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"   id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'2" value="2"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'2">2</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'""    id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'3" value="3"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'3">3</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"   id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'4" value="4"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'4">4</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"   id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'5" value="5"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'5">5</label> ';
				
                                htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"  id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="">';
				
				htmlItems += '</fieldset></div>';
                                
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';

				
				
			}
			break;	
			case "!":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'<br/>Choose one of the following answers</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
                                
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"  id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="">';
				htmlItems += '<select class="survey_checkcondition change" type="select-one"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" data-native-menu="true" data-inline="false">';
				htmlItems += '<option value="please-choose" data-placeholder="true">Please choose...</option>';
				for(var index=0;index < anQuestion.answer.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer[index]) + ')');
					htmlItems  += '<option value="'+anAnswerDetail.code+'" >'+(anAnswerDetail.answer)+'</option>';
				}
				htmlItems += '</select></div>';
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
				
			}
			break;
			
			case "L":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
                                
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><fieldset data-role="controlgroup">';
			
                                for(var index=0;index < anQuestion.answer.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer[index]) + ')');
					htmlItems += '<input class="survey_checkcondition clickevent"   type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="'+anAnswerDetail.code+'"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.answer)+'</label> ';
				}
                                /*
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'1" value="1"><label for="qid_'+anQuestion.qid+'_1">1</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'2" value="2"><label for="qid_'+anQuestion.qid+'_2">2</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'3" value="3"><label for="qid_'+anQuestion.qid+'_3">3</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'4" value="4"><label for="qid_'+anQuestion.qid+'_4">4</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'5" value="5"><label for="qid_'+anQuestion.qid+'_5">5</label> ';
                                */
				htmlItems += '<input type="radio" class="survey_checkcondition clickevent"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'NANS" value=""><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'NANS">No Answer</label> ';
                                htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"  id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="">';
				htmlItems += '</fieldset></div>';
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
				
				
			}
			break;	
			
			case "O":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
                                
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><fieldset data-role="controlgroup">';
			
				for(var index=0;index < anQuestion.answer.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer[index]) + ')');
					htmlItems += '<input class="survey_checkcondition clickevent"   type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="'+anAnswerDetail.code+'"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.answer)+'</label> ';
				}
				/*
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="qid_'+anQuestion.qid+'_2" value="2"><label for="qid_'+anQuestion.qid+'_2">2</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="qid_'+anQuestion.qid+'_3" value="3"><label for="qid_'+anQuestion.qid+'_3">3</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="qid_'+anQuestion.qid+'_4" value="4"><label for="qid_'+anQuestion.qid+'_4">4</label> ';
				
				htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="qid_'+anQuestion.qid+'_5" value="5"><label for="qid_'+anQuestion.qid+'_5">5</label> ';
                                    
                                htmlItems += '<input type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="qid_'+anQuestion.qid+'_0" value="0"><label for="qid_'+anQuestion.qid+'_0">No Answer</label> ';
				*/
				htmlItems += '<input class="survey_checkcondition clickevent"   type="radio" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'NANS" value=""><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'NANS">No Answer</label> ';
                                htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="">';
				htmlItems += '</fieldset><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'comment">Please enter your comment here:</label><textarea type="textarea" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'comment"  id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'comment" max-length="'+anQuestion.maxchars+'"></textarea></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
				
			}
			break;
			
			case "X":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
				if(String(anQuestion.help).length > 0)
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
			}
			break;	
			
			case "|":
			{
                                var extension = "";
                                var maxSize = (anQuestion.upload[0].max_filesize?anQuestion.upload[0].max_filesize:1024);

                                if(anQuestion.upload)
                                    extension = 'allowed_filetypes="'+anQuestion.upload[0].allowed_filetypes+'" allowed_filesize="'+maxSize+'"';
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'<br/>Please upload at most one file</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
                                
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
                                htmlItems += '<input type="afile" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+' fileType" onclick="getAFile(this);" readonly="true" data-clear-btn="true" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="" '+extension+' fileURL="">';
				//htmlItems += '<input type="hidden"  name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'_filecount"  value="1"></div>';

				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'">This question is mandatory</div>';
			}
			break;
			
			case "D":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
                                
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><input type="adate" onclick="getCalendar(this)" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" readonly="true" placeholder="yyyy/mm/dd" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value=""  ></div>';
                                
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "Y":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><fieldset data-role="controlgroup" data-type="horizontal">';
			
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'Y" value="Y"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'Y">Yes</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'N" value="N"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'N">No</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value=""><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'">No Answer</label> ';
				
                                htmlItems += '<input class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" type="hidden" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"  value="">';
                                
				htmlItems += '</fieldset></div>';
				
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "G":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><fieldset data-role="controlgroup" data-type="horizontal">';
			
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'F" value="F"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'F">Female</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'M" value="M"><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'M">Male</label> ';
				
				htmlItems += '<input class="survey_checkcondition clickevent" type="radio"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value=""><label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'">No Answer</label> ';
				
                                htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"  value="">';
                                
				htmlItems += '</fieldset></div>';
				
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "S":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapQuestion"><input class="survey_checkcondition keyup" type="text"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value=""></div>';
				htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'"  value="">';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "M":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'<br/>Check any that apply</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup">';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<input class="survey_checkcondition clickevent"   type="checkbox" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" class="ShibaSurveyMSelection">';
                                        htmlItems += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'"  value="">';
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "P":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'<br/>Check any that apply</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';
					htmlItems  += '<input class="survey_checkcondition clickevent"   type="checkbox" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" class="ShibaSurveyPSelection">';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" val="">';
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<input class="survey_checkcondition keyup"   type="text" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'comment" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'comment" value="" >';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "N":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'<br/>Only numbers may be entered in this field.</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><input class="survey_fixcheckcondition keyup" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" type="number" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value=""></div>';
                                htmlItems += '<input  type="hidden" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="">';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
				
			}
			break;
			
			case "K":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'<br/>Only numbers may be entered in thess fields.</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<input class="survey_fixcheckcondition keyup"  type="number" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					
				}
				htmlItems += '</div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "Q":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<input class="survey_checkcondition keyup"   type="text" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					
				}
				htmlItems += '</div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "T":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><textarea class="survey_checkcondition keyup" type="textarea" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="" rows="5" max-length="'+anQuestion.maxchars+'"></textarea></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
				
			}
			break;
			
			case "U":
			{
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>'; 
				htmlItems += '<div class="ui-body ui-body-a wrapContent"><textarea class="survey_checkcondition keyup" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" type="textarea"  name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'" value="" rows="15" cols="40" max-length="'+anQuestion.maxchars+'" style="height: inherit !important"></textarea></div>';
				
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "F":
			{
			
				var selection = '';
				selection += '<option value="" data-placeholder="true">No Answer</option>';
				for(var index=0;index < anQuestion.answer.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer[index]) + ')');
					selection  += '<option value="'+anAnswerDetail.code+'" >'+(anAnswerDetail.answer)+'</option>';
				}
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "B":
			{
			
				var selection = '';
				selection += '<option value="" data-placeholder="true">No Answer</option>';
				for(var index=1;index < 11; index++)
				{
					
					selection  += '<option value="'+index+'" >'+index+'</option>';
				}
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"     name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "A":
			{
			
				var selection = '';
				selection += '<option value="" data-placeholder="true">No Answer</option>';
				for(var index=1;index < 6; index++)
				{
					
					selection  += '<option value="'+index+'" >'+index+'</option>';
				}
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "E":
			{
			
				var selection = '';
				selection += '<option value="" data-placeholder="true">No Answer</option>';
				selection  += '<option value="I" >Increase</option>';
				selection  += '<option value="S" >Same</option>';
				selection  += '<option value="D" >Decrease</option>';
				
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			case "1":
			{
                                
				var selection = '';
				var selection1 = '';
				selection += '<option value="" >No Answer</option>';
				selection1 += '<option value="" >No Answer</option>';
				for(var index=0;index < anQuestion.answer0.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer0[index]) + ')');
					selection  += '<option value="'+anAnswerDetail.code+'" >'+(anAnswerDetail.answer)+'</option>';
				}
				for(var index=0;index < anQuestion.answer1.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer1[index]) + ')');
					selection1  += '<option value="'+anAnswerDetail.code+'" >'+(anAnswerDetail.answer)+'</option>';
				}
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="qid_'+anQuestion.qid+'_'+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'#0" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'#0" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_0" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_0" value="">';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'#1" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'#1" data-native-menu="true" data-inline="false">';
					htmlItems  += selection1;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_1" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_1" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			case "H":
			{
				var selection = '';
				selection += '<option value="" >No Answer</option>';
				for(var index=0;index < anQuestion.answer.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.answer[index]) + ')');
					selection  += '<option value="'+anAnswerDetail.code+'" >'+(anAnswerDetail.answer)+'</option>';
				}
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "C":
			{
				var selection = '';
				selection += '<option value="">No Answer</option>';
				selection  += '<option value="Y" >Yes</option>';
				selection  += '<option value="U" >Uncertain</option>';
				selection  += '<option value="N" >No</option>';
				
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < anQuestion.subquestion.length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'">'+(anAnswerDetail.question)+'</label>';
					htmlItems  += '<select type="select-one" class="survey_checkcondition change"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" data-native-menu="true" data-inline="false">';
					htmlItems  += selection;
					htmlItems  += '</select>';
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					htmlItems  += '</div>';
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case ":":
			{
				var length =  anQuestion.subquestion.length;
				var length1 = anQuestion.subquestion1.length;
				var selection = '';
				selection += '<option value="" data-placeholder="true">....</option>';
				for(var index=1;index < 11; index++)
				{
					
					selection  += '<option value="'+index+'" >'+index+'</option>';
				}
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
								  
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<h3>'+(anAnswerDetail.question)+'</h3>';
					for(var j=0;j < length1; j++)
					{						
						var exAnswer =  eval('(' + JSON.stringify(anQuestion.subquestion1[j]) + ')');
						htmlItems  += '<div class="ui-corner-all custom-corners">';	
						htmlItems  += '<div class="ui-bar ui-bar-a">';					
						htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'">'+(exAnswer.question)+'</label>';
						htmlItems  += '</div>';
						htmlItems  += '<div class="ui-body ui-body-a">';
						htmlItems  += '<select type="select-one" class="survey_fixcheckcondition change"  name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" data-native-menu="true" >';
						htmlItems  += selection;
						htmlItems  += '</select>';
                                                htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" value="">';
						htmlItems  += '</div>';
						htmlItems  += '</div>';
						htmlItems  += '<div style="clear:both">&nbsp;</div>';
						
					}
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';
					//htmlItems  += '<select name="qid_'+anQuestion.qid+'_'+anAnswerDetail.code+'_comment" id="qid_'+anQuestion.qid+'_'+anAnswerDetail.code+'" data-native-menu="false" data-inline="true">';
					//htmlItems  += selection;
					//htmlItems  += '</select>';
					htmlItems  += '</div>';
					
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
		
			case ";":
			{
				var length =  anQuestion.subquestion.length;
				var length1 = anQuestion.subquestion1.length;
				
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				htmlItems += '<fieldset data-role="controlgroup" >';				
				
				for(var index=0;index < length; index++)
				{
					var anAnswerDetail =  eval('(' + JSON.stringify(anQuestion.subquestion[index]) + ')');
								  
					htmlItems  += '<div class="ui-bar ui-bar-a">';					
					htmlItems  += '<h3>'+(anAnswerDetail.question)+'</h3>';
					for(var j=0;j < length1; j++)
					{						
						var exAnswer =  eval('(' + JSON.stringify(anQuestion.subquestion1[j]) + ')');
						htmlItems  += '<div class="ui-corner-all custom-corners">';	
						htmlItems  += '<div class="ui-bar ui-bar-a">';					
						htmlItems  += '<label for="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'">'+(exAnswer.question)+'</label>';
						htmlItems  += '</div>';
						htmlItems  += '<div class="ui-body ui-body-a">';
						htmlItems  += '<input type="text" class="survey_checkcondition keyup"   name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" id="answer'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" >';						
						htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'_'+exAnswer.code+'" value="">';						
						htmlItems  += '</div>';
						htmlItems  += '</div>';
						htmlItems  += '<div style="clear:both">&nbsp;</div>';
						
					}
                                        htmlItems  += '<input type="hidden" class="'+(anQuestion.mandatory == "Y"?"anMandatory":"")+'" name="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" id="java'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+anAnswerDetail.code+'" value="">';						
					//htmlItems  += '<select name="qid_'+anQuestion.qid+'_'+anAnswerDetail.code+'_comment" id="qid_'+anQuestion.qid+'_'+anAnswerDetail.code+'" data-native-menu="false" data-inline="true">';
					//htmlItems  += selection;
					//htmlItems  += '</select>';
					htmlItems  += '</div>';
					
					htmlItems  += '<div style="clear:both">&nbsp;</div>';
				}
				htmlItems += '</fieldset></div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
			}
			break;
			
			case "R":
			{
				var length =  anQuestion.answer.length;
				htmlItems += '<div class="ui-bar ui-bar-a">'+anQuestion.question+'</div>';
                                if(String(anQuestion.help).length > 0)
                                htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left" style="text-align:left;font-weight:normal;">'+anQuestion.help+'&nbsp;</div>';
				htmlItems += '<div class="ui-body ui-body-a wrapContent">';
				//htmlItems += '<input type="hidden" class="qCodeRanking" value="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+'">';
				//for(var index=0;index < length; index++)
				//{
				//	htmlItems += '<input type="hidden" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+index+'" value="">';
				//}
				htmlItems += '<ul data-role="listview" data-theme="b" style="margin-bottom: 50px;">';
				for(var index=0;index < length; index++)
				{
					var answerDetail = eval('(' + JSON.stringify(anQuestion.answer[index]) + ')');
					htmlItems  += '<li>';
					htmlItems  += '<h3>'+(answerDetail.answer)+'</h3>';
					htmlItems  += '<div position=relative align=right data-role="controlgroup" data-type="horizontal">';
					if(index != 0)
					htmlItems += '<a href="#"  data-role="button" data-icon="carat-u" class="split-button-custom UpRanking" style="visibility:visible;">Up</a>';
					else
					htmlItems += '<a href="#"  data-role="button" data-icon="carat-u" class="split-button-custom UpRanking" style="visibility:hidden">Up</a>';
					//htmlItems  += '<a href="#"><h3>'+answerDetail.answer+'</h3></a>';	//value="'+index+'" data="'+anQuestion.qid+'_'+answerDetail.code+'"
					//if(index != 0)
						//htmlItems  += '<a href="#" data-icon="carat-u" class="ui-btn-right UpRanking"></a>';
						
					//htmlItems  += '<label style="font-weight: normal !important;">'+answerDetail.answer+'</label>';
					if(index != length -1)
						htmlItems  += '<a href="#"  data-role="button" data-icon="carat-d" class="split-button-custom DownRanking" style="visibility:visible">Down</a>';
					else
						htmlItems  += '<a href="#"  data-role="button" data-icon="carat-d" class="split-button-custom DownRanking" style="visibility:hidden">Down</a>';
					
                                        var tempIndex = index + 1;
                                        htmlItems += '<input type="hidden" name="'+sid+"X"+anQuestion.gid+"X"+anQuestion.qid+"_SHIBASURVEYRANK_"+answerDetail.code+'" value="'+tempIndex+'" class="rankingInputOrder">';
					
					htmlItems += '</div>';
					htmlItems  += '</li>';
					//htmlItems += '<br/>';
				}
				htmlItems += '</ul>';
				htmlItems += '</div>';
				htmlItems += '<div class="ui-bar ui-bar-a ui-icon-info ui-btn-icon-left mandatory hiddenError" style="text-align:left;font-weight:normal;">This question is mandatory</div>';
				
			}
			break;
	
		}
                htmlItems += '</div>';
                
		return htmlItems;
	},
   initListPage: function () {
                console.log('init survey list');
   		var $surveyList = $('#survey-list');
   		var htmlItems = '';
   		$surveyList.html("");
   		
					
   		var feedName = window.localStorage.getItem('username');
   		var feedUrl =  window.localStorage.getItem('url');
   		var surveyList = window.localStorage.getItem('surveyList_'+feedName);
   		
   		if(surveyList == null || g_forceRefreshListSurvey == true)
   		{
                    console.log('forced to refresh the survey list');
	   		 $.ajax({
	            url: feedUrl+'/getpublic.php?user='+feedName,
	            dataType: 'json',
                    
	            beforeSend: function () {
	               $('#refreshingListPopup').popup('open',{history:false});
	            },
	            success: function (data) {
	            	
                        var empObject = eval('(' + JSON.stringify(data[0]) + ')');
                        if(empObject.result == "SUCCESS" && empObject.code==119)
                        {
                                
                                window.localStorage.removeItem('surveyList_'+feedName);
                                window.localStorage.setItem('surveyList_'+feedName, JSON.stringify(empObject.posts));

                                var surveys = empObject.posts;
                                for(var index=0;index < surveys.length; index++)
                                {
                                        var anSurvey =  eval('(' + JSON.stringify(surveys[index]) + ')');
                                        htmlItems  += '<li><a href="menu.html?sid=' + anSurvey.sid + '">' + anSurvey.surveyls_title + '</a></li>';
                                }
                                $surveyList.append(htmlItems).listview('refresh');
                        }
                        else
                        {
                                htmlItems = 'No available surveys!';
                                $surveyList.append(htmlItems).listview('refresh');
                        }
	            	
	            },           
	            error: function () {
                       $('#refreshingListPopup').popup('close');
	               navigator.notification.alert('Unable to retrieve the list of survey now.Please try again later', function () {
	               }, 'Error');
	            },
	            complete: function () {
	               $('#refreshingListPopup').popup('close');
	            }});
                }
                else
                {
                        console.log('loaded survey list from local data');
                        var surveys = JSON.parse(window.localStorage.getItem('surveyList_'+feedName));

                        for(var index=0;index < surveys.length; index++)
                        {
                                var anSurvey =  eval('(' + JSON.stringify(surveys[index]) + ')');
                                htmlItems  += '<li><a href="menu.html?sid=' + anSurvey.sid + '">' + anSurvey.surveyls_title + '</a></li>';
                        }
                        
                        if(surveys.length <= 0)
                            htmlItems = 'No available surveys!';
                        $surveyList.append(htmlItems).listview('refresh');
                }
                g_forceRefreshListSurvey = false;
   		
   },
   getSurveyTitle: function(sid){
   		var surveyList = JSON.parse(window.localStorage.getItem('surveyList_'+g_username));
   		
   		if(surveyList)
   		{
   			for(var index=0;index < surveyList.length; index++)
			{
				var anSurvey =  eval('(' + JSON.stringify(surveyList[index]) + ')');
				
				if(parseInt(anSurvey.sid) == sid)
					return anSurvey.surveyls_title;
			}
   		}
   		return null;
   },
   getLanguageList: function(sid){
   		
                var feedName = window.localStorage.getItem('username');

   		var surveyList = JSON.parse(window.localStorage.getItem('surveyList_'+feedName));
   		
   		if(surveyList)
   		{
   			for(var index=0;index < surveyList.length; index++)
			{
				var anSurvey =  eval('(' + JSON.stringify(surveyList[index]) + ')');
				
				if(parseInt(anSurvey.sid) == sid)
					return anSurvey.languagelist;
			}
   		}
   		return null;
   },
   saveUserListLocal: function(username, password){
       
       var userLists =  window.localStorage.getItem('shiba_userlist');
       
       if(userLists)
       {
          userLists = JSON.parse(userLists);
          var exist = false;
          for(var index = 0; index < userLists.length; index++ )
          {
              var anUser = eval('('+JSON.stringify(userLists[index])+')');
              if(anUser.username == username)
              {
                  anUser.password = password;
                  exist = true;
                  break;
              }
          }
          if(!exist)
            userLists.push({"username":username,"password":hashCode(password)});
          console.log(JSON.stringify(userLists));
          window.localStorage.setItem('shiba_userlist', JSON.stringify(userLists));
          
       }
       else
       {
          userLists = {};
          userLists['username']=username;
          userLists['password']= hashCode(password);
           window.localStorage.setItem('shiba_userlist', "["+JSON.stringify(userLists)+"]");
           console.log("["+JSON.stringify(userLists)+"]");
       }
   },
   clearUserListLocal: function(){
       
       windlow.localStorage.removeItem('shiba_userlist');
   },
   /*
    * Desc: check whether an user has been logined successfully to the system.
    * Return:
    *   -1: List Is Empty.
    *   0:  Username has not logined to system before.
    *   1:  Username exist but wrong password.
    *   2:  Username and Password is correct.
    * 
    */
   checkExistUserListLocal: function(ausername,password)
   {
       
       var userLists =  window.localStorage.getItem('shiba_userlist');
       
       if(userLists)
       {
            
            userLists = JSON.parse(userLists);
           
            for(var index=0;index < userLists.length; index++)
            {
               
                var anUser = eval('(' + JSON.stringify(userLists[index]) + ')');
                console.log('username '+ anUser.username);
                if(anUser.username == ausername)
                {
                    if(anUser.password == hashCode(password))
                        return 2;
                    return 1;
                }      
            }
           return 0;
       }
       else
           return -1;
   },
   initLoginPage: function () {
      
	 var lastURL = Application.getRecentURL();
	  if(lastURL.length <=0)
		lastURL = "http://limesurvey.shiba-survey.org/webservice";
      $('#u-username').val(Application.getRecentUsername()); 
      $('#url-add').val(lastURL); 
      
       
      $('#loginForm').submit(function (event) {
         event.preventDefault();
         //window.localStorage.clear();
         var feedName = $('#u-username').val().trim();
         var feedUrl = $('#url-add').val().trim();
         var feedPass = $('#u-password').val().trim();
        
         if (feedUrl === '') {
            navigator.notification.alert('URL field is required and cannot be empty', function () {
            }, 'Error');
            return false;
         }
          if (feedName === '') {
            navigator.notification.alert('Name field is required and cannot be empty', function () {
            }, 'Error');
            return false;
         }
          if (feedPass === '') {
            navigator.notification.alert('Password field is required and cannot be empty', function () {
            }, 'Error');
            return false;
         }
         
         if(feedUrl != Application.getRecentURL())
         {
             g_forceRefreshListSurvey = true;
             Application.updateRecentURL(feedUrl);
         }
         
         if(feedName != Application.getRecentUsername())
         {
             g_forceRefreshListSurvey = true;
             Application.updateRecentUsername(feedName);
         }
         
         if(Application.isConnection())
         {
            $.ajax({
               url: feedUrl+'/login.php?user='+feedName+'&password='+feedPass,
               dataType: 'json',
               
               beforeSend: function () {
                  $.mobile.loading('show', {
                     text: 'Please wait while signing in...',
                     textVisible: true,
                     textonly: false
                  });
               },
               success: function (data) {

                                   var empObject = eval('(' + JSON.stringify(data[0]) + ')');
                                   if(empObject.result == "SUCCESS" && empObject.code==113)
                                   {
                                           window.localStorage.setItem('username',feedName);
                                           window.localStorage.setItem('url',feedUrl);
                                           Application.saveUserListLocal(feedName,feedPass);
                                           g_username = feedName;
                                           g_loggedIn = true;
                                           $.mobile.changePage('list.html',{ transition: "none",reverse: false,changeHash: false});
                                   }
                                   else
                                   {
                                            navigator.notification.alert('Wrong username or password', function () {
                            }, 'Error');
                                   }

               },           
               error: function () {
                  navigator.notification.alert('Unable to login now.Please try again later', function () {
                  }, 'Error');
               },
               complete: function () {
                  $.mobile.loading('hide');
               }});
          }  
          else
          {
              console.log("start log in from local");
              var loginOfflineStatus = Application.checkExistUserListLocal(feedName,feedPass);
              switch(loginOfflineStatus)
              {
                  case 2:
                  {
                       g_loggedIn = true;
                       g_username = feedName;
                       window.localStorage.setItem('username',feedName);
                       window.localStorage.setItem('url',feedUrl);
                       $.mobile.changePage('list.html',{ transition: "none",reverse: false,changeHash: false});
                       console.log("loged in from local");
                  }
                  break;
                  case 1:
                  {
                      navigator.notification.alert('Your password is invalid for offline mode.Please try again!', function () {}, 'Error');
                  }
                  break;
                  case 0:
              case -1:
                  {
                      navigator.notification.alert('Your username is invalid for offline mode.Please try again later', function () {}, 'Error');
                  }
                  break;
              }
              
          }
         return false;
      });
  
   }, 
    updateIcons: function () {
      var $buttons = $('a[data-icon], button[data-icon]');
      var isMobileWidth = ($(window).width() <= 480);
      isMobileWidth ? $buttons.attr('data-iconpos', 'notext') : $buttons.removeAttr('data-iconpos');
   },         
   openLinksInApp: function () {
      $(document).on('click', 'a[target=_blank]', function (event) {
         event.preventDefault();
         window.open($(this).attr('href'), '_blank');
      });
   }
};