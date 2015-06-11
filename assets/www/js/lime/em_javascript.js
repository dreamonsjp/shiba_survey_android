function LEMcount()
{
   
    var result=0;
    for (i=0;i<arguments.length;++i) {
        var arg = arguments[i];
        if (arg !== '') {
            ++result;
        }
    }
    return result;
}

function LEMunique()
{
    var uniqs = new Array();
    for (i=0;i<arguments.length;++i) {
        var arg = arguments[i];
        if (trim(arg)=='')
            continue;
        if (typeof uniqs[arg] !== 'undefined')
            return false;
        uniqs[arg] = 1;
    }
    return true;
}

function LEMcountif()
{
   
    var result=0;
    var match=arguments[0];
    for (i=1;i<arguments.length;++i) {
        var arg = arguments[i];
        if (arg == match) {
            ++result;
        }
    }
    return result;
}

function LEMcountifop()
{
   
    var result=0;
    var op=arguments[0];
    var value=arguments[1];
    if (op == 'RX') {
        var reg = new RegExp(value.substr(1,value.length-2));
    }
    for (i=2;i<arguments.length;++i) {
        var arg = arguments[i];
        switch(op)
        {
            case '==': case 'eq': if (arg == value) { ++result; } break;
            case '>=': case 'ge': if (arg >= value) { ++result; } break;
            case '>':  case 'gt': if (arg > value) { ++result; } break;
            case '<=': case 'le': if (arg <= value) { ++result; } break;
            case '<':  case 'lt': if (arg < value) { ++result; } break;
            case '!=': case 'ne': if (arg != value) { ++result; } break;
            case 'RX': {
                try {
                    if (reg.test(arg)) {
                        ++result;
                    }
                }
                catch (err) {
                    return false;
                }
            }
        }
    }
    return result;
}

function LEMsumifop()
{
    var result=0;
    var op=arguments[0];
    var value=arguments[1];
    if (op == 'RX') {
        var reg = new RegExp(value.substr(1,value.length-2));
    }
    for (i=2;i<arguments.length;++i) {
        var arg = arguments[i];
        switch(op)
        {
            case '==': case 'eq': if (arg == value) { result += arg; } break;
            case '>=': case 'ge': if (arg >= value) { result += arg; } break;
            case '>':  case 'gt': if (arg > value) { result += arg; } break;
            case '<=': case 'le': if (arg <= value) { result += arg; } break;
            case '<':  case 'lt': if (arg < value) { result += arg; } break;
            case '!=': case 'ne': if (arg != value) { result += arg; } break;
            case 'RX': {
                try {
                    if (reg.test(arg)) {
                        result += arg;
                    }
                }
                catch (err) {
                    return false;
                }
            }
        }
    }
    return result;
}

function LEMpi()
{
    return Math.PI;
}

function LEMsum()
{
    var result=0;
    for (i=0;i<arguments.length;++i) {
        var arg = arguments[i];
        if (!isNaN(arg)) {
            result += (+arg);
        }
    }
    return result;
}

function LEMintval(a)
{
    if (isNaN(a)) {
        return NaN;
    }
    return Math.floor(+a);
}

function LEMis_null(a)
{
    return (a == null);
}

function LEMis_float(a)
{
    if (isNaN(a))
    {
        return false;
    }
    var num = new Number(a);
    return (Math.floor(num) != num);
}

function LEMis_int(a)
{
    if (isNaN(a))
    {
        return false;
    }
    var num = new Number(a);
    return (Math.floor(num) == num);
}

function LEMis_numeric(a)
{
    if (a === '') {
        return false;  
    }
    return !(isNaN(a));
}

function LEMis_string(a)
{
    return isNaN(a);
}

function LEMif(a,b,c)
{
    if (a === '0') { return c; } 
    return (!!a) ? b : c;
}


function LEMlist()
{
   
    var result="";
    var joiner = ', ';
    j=1;    
    for (i=0;i<arguments.length;++i) {
        var arg = arguments[i];
        if (arg !== '') {
            if (j > 1) {
                result += joiner + arg;
            }
            else {
                result += arg;
            }
            ++j;
        }
    }
    return result;
}

function LEMlog()
{
   
    if (arguments.length < 1) {
        return NaN;
    }
    var base=Math.exp(1);
    if(arguments.length>1){
        base = arguments[1];
        if (isNaN(base)) { return NaN;}
        if (base<=0 ) { return NaN;}
        base=Math.abs(parseFloat(arguments[1]));
    }
    if(base==Math.exp(1)){
        return Math.log(arguments[0]);
    }else{
        return Math.log(arguments[0])/Math.log(base);
    }
}

function LEMjoin()
{
    var result="";
    for (i=0;i<arguments.length;++i) {
        result += arguments[i];
    }
    return result;
}

function LEMimplode()
{
   
    var result="";
    if (arguments.length <= 1) {
        return "";
    }
    var joiner = arguments[0];
    for (i=1;i<arguments.length;++i) {
        var arg = arguments[i];
        if (i > 1) {
            result += joiner + arg;
        }
        else {
            result += arg;
        }
    }
    return result;
}

function LEMregexMatch(pattern,within)
{
    try {
        var reg = new RegExp(pattern.substr(1,pattern.length-2));
        return reg.test(within);
    }
    catch (err) {
        return false;
    }
}

function LEMstrlen(a)
{
    var  str = new String(a);
    return str.length;
}

function LEMstr_replace(needle, replace, haystack)
{
    var str = new String(haystack);
    return str.replace(needle, replace);
}

function LEMstrpos(haystack,needle)
{
    var str = new String(haystack);
    return str.search(needle);
}

function LEMempty(v)
{
    if (v === "" || v === false) {
        return true;
    }
    return false;
}

function LEMbool(v)
{
    bool = new Boolean(v);
    if (v.valueOf() && v != 'false') {
        return true;    
    }
    return false;
}

function LEMeq(a,b)
{
    if ((a==="true" && b==="1") || (a==="1" && b==="true")) {
        return true;
    }
    if ((a==="false" && (b==="0" || b==="")) || ((a==="0" || a==="") && b ==="false")) {
        return true;
    }
    return a==b;
}

function LEMval(alias)
{
   
    var str = new String(alias);
    var varName = alias;
    var suffix = 'code';    
    if(typeof bNumRealValue == 'undefined'){bNumRealValue=false;} 

    
    if (str == '') return '';
    newval = str;
    if (LEMradix === ',') {
        newval = str.split(',').join('.');
    }
    if (newval == parseFloat(newval)) {
        if (newval.length > 0 && newval[0]==0) {
            return newval;   
        }
        return +newval;
    }

    if (str.match(/^INSERTANS:/)) {
        suffix = 'shown';
        varName = varName.substr(10);
    }
    else if (str.match(/\.(code|gid|grelevance|gseq|jsName|mandatory|NAOK|qid|qseq|question|readWrite|relevanceStatus|relevance|rowdivid|sgqa|shown|type|valueNAOK|value)$/)) {
        varName = str.replace(/\.(code|gid|grelevance|gseq|jsName|mandatory|NAOK|qid|qseq|question|readWrite|relevanceStatus|relevance|rowdivid|sgqa|shown|type|valueNAOK|value)$/,'')
        suffix = str.replace(/^(.+)\./,'');
    }

    jsName = LEMalias2varName[varName];
    attr = LEMvarNameAttr[jsName];
    if ((suffix.match(/^code|NAOK|shown|valueNAOK|value$/)) && attr.qid!='') {
        if (!LEMval(varName + '.relevanceStatus')) {
            return '';
        }
    }
    var whichJsName;   
    if (LEMmode=='survey' || (LEMmode=='group' && attr.gseq == LEMgseq) || (LEMmode=='question' && attr.qid == LEMqid)) {
        whichJsName = (typeof attr.jsName_on === 'undefined') ? attr.jsName : attr.jsName_on;
    }
    else {
        whichJsName = attr.jsName;
    }
    if (whichJsName === null || typeof document.getElementById(whichJsName) === 'undefined' || document.getElementById(whichJsName) === null) {
        an_error = true;    
        return '';
    }

   
    switch (suffix) {
        case 'relevanceStatus': {
            grel = qrel = sgqarel = 1;
            if (!(typeof attr.gseq === 'undefined') && !(document.getElementById('relevanceG' + attr.gseq) === null)) {
                if(typeof attr.type === 'undefined' || attr.type!="*")
                    grel = parseInt(document.getElementById('relevanceG' + attr.gseq).value);
            }
            if (!(typeof attr.qid === 'undefined') && !(document.getElementById('relevance' + attr.qid) === null)) {
                qrel = parseInt(document.getElementById('relevance' + attr.qid).value);
            }
            if (!(typeof attr.rowdivid === 'undefined') && !(document.getElementById('relevance' + attr.rowdivid) === null)) {
                sgqarel = parseInt(document.getElementById('relevance' + attr.rowdivid).value);
            }
            return (grel && qrel && sgqarel);
        }
        case 'shown': {
            value = htmlspecialchars_decode(document.getElementById(whichJsName).value);
            switch(attr.type)
            {
                case 'G': 
                case 'Y': 
                case 'C': 
                case 'E': 
                    shown = (typeof attr.answers[value] === 'undefined') ? '' : attr.answers[value];
                    break;
                case '!': 
                case 'L': 
                case 'O': 
                case 'H': 
                case 'F': 
                case 'R': 
                    if (attr.type == 'O' && varName.match(/comment$/)) {
                        answer = value;
                    }
                    else if ((attr.type == 'L' || attr.type == '!') && varName.match(/_other$/)) {
                        answer = value;
                    }
                    else {
                        which_ans = '0~' + value;
                        if (typeof attr.answers[which_ans] === 'undefined') {
                            answer = value;
                        }
                        else {
                            answerParts = attr.answers[which_ans].split('|');
                            answerParts.shift();    
                            answer = answerParts.join('|');
                        }
                    }
                    shown = answer;
                    break;
                case '1': 
                    prefix = (attr.jsName.match(/_1$/)) ? '1' : '0';
                    which_ans = prefix + '~' + value;
                    if (typeof attr.answers[which_ans] === 'undefined') {
                        answer = '';
                    }
                    else {
                        answerParts = attr.answers[which_ans].split('|');
                        answerParts.shift();   
                        answer = answerParts.join('|');
                    }
                    shown = answer;
                    break;
                case 'A': 
                case 'B': 
                case ':': 
                case '5': 
                case 'N': 
                case 'K': 
                case 'Q': 
                case ';': 
                case 'S': 
                case 'T': 
                case 'U': 
                case 'D': 
                case '*': 
                case 'I': 
                case '|': 
                case 'X': 
                    shown = value; 
                    break;
                case 'M': 
                case 'P': 
                    if (typeof attr.question === 'undefined' || value == '') {
                        shown = '';
                    }
                    else {
                        if (attr.type == 'P' && varName.match(/comment$/)) {
                            shown = value;
                        }
                        else {
                            shown = htmlspecialchars_decode(attr.question);
                        }
                    }
                    break;
            }
        }
            return htmlspecialchars_decode(shown);
        case 'gid':
            return attr.gid;
        case 'grelevance':
            return attr.grelevance;
        case 'mandatory':
            return attr.mandatory;
        case 'qid':
            return attr.qid;
        case 'question':
            return htmlspecialchars_decode(attr.question);
        case 'readWrite':
            return attr.readWrite;
        case 'relevance':
            return htmlspecialchars_decode(attr.relevance);
        case 'sgqa':
            return attr.sgqa;
        case 'type':
            return attr.type;
        case 'gseq':
            return attr.gseq;
        case 'qseq':
            return attr.qseq;
        case 'jsName':
            return whichJsName;
        case 'code':
        case 'NAOK':
        case 'value':
        case 'valueNAOK':
        {
            value = htmlspecialchars_decode(document.getElementById(whichJsName).value);
            if (value === '') {
                return '';
            }
            if (suffix == 'value' || suffix == 'valueNAOK') {
               
                switch (attr.type) {
                    case '!': 
                    case 'L': 
                    case 'O': 
                    case 'H': 
                    case 'F': 
                    case 'R': 
                        if (attr.type == 'O' && varName.match(/comment$/)) {

                        }
                        else if ((attr.type == 'L' || attr.type == '!') && varName.match(/_other$/)) {

                        }
                        else {
                            which_ans = '0~' + value;
                            if (typeof attr.answers[which_ans] === 'undefined') {
                                value = '';
                            }
                            else {
                                answerParts = attr.answers[which_ans].split('|');
                                value = answerParts[0];
                            }
                        }
                        break;
                    case '1': 
                        prefix = (attr.jsName.match(/_1$/)) ? '1' : '0';
                        which_ans = prefix + '~' + value;
                        if (typeof attr.answers[which_ans] === 'undefined') {
                            value = '';
                        }
                        else {
                            answerParts = attr.answers[which_ans].split('|');
                            value = answerParts[0];
                        }
                        break;
                }
            }
            if (typeof attr.onlynum !== 'undefined' && attr.onlynum==1) {
                if(value=="")
                {
                    return "";
                }
                if (LEMradix === ',') {
                    var regValidateNum = /^-?\d*\,?\d*$/;
                }else{
                    var regValidateNum = /^-?\d*\.?\d*$/;
                }
                if(!regValidateNum.test(value))
                {
                    if(bNumRealValue)
                    {
                        return value;
                    }
                    else
                    {
                        return '';
                    }
                }
                newval=value;
                if (LEMradix === ',') {
                    newval = value.split(',').join('.');
                }
                return +newval;
            }
            else if (isNaN(value)) {
                if (value==='false') {
                    return ''; 
                }
                return value;
            }
            else {
                if (value.length > 0 && value[0]==0) {
                    return value;  
                }
                return +value; 
            }
        }
        case 'rowdivid':
            if (typeof attr.rowdivid === 'undefined' || attr.rowdivid == '') {
                return '';
            }
            return attr.rowdivid;
        default:
            return 'Unknown Attribute: ' . suffix;
    }
}

function LEMfixnum(value)
{
    var newval = String(value);
    if (parseFloat(newval) != value) {
        return value;  
    }
    if (LEMradix===',') {
        newval = newval.split('.').join(',');
        if (parseFloat(newval) != value) {
            return value;  
        }
    }
    return value;
}

function LEMstrip_tags(htmlString)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = htmlString;
   return tmp.textContent||tmp.innerText;
}

function LEMstddev()
{
    vals = new Array();
    j = 0;
    for (i=0;i<arguments.length;++i) {
        if (LEMis_numeric(arguments[i])) {
            vals[j++] = arguments[i];
        }
    }
    count = vals.length;
    if (count <= 1) {
        return 0;  
    }
    sum = 0;
    for (i=0;i<vals.length;++i) {
        sum += vals[i];
    }
    mean = sum / count;

    sumsqmeans = 0;
    for (i=0;i<vals.length;++i) {
        sumsqmeans += (vals[i] - mean) * (vals[i] - mean);
    }
    stddev = Math.sqrt(sumsqmeans / (count-1));
    return stddev;
}

function LEMstrtoupper(s)
{
    return s.toUpperCase();
}

function LEMstrtolower(s)
{
    return s.toLowerCase();
}


function LEManyNA()
{
    for (i=0;i<arguments.length;++i) {
        var arg = arguments[i];
        if (arg.match(/\.NAOK$/)) {
            continue;
        }
        if (typeof LEMalias2varName[arg] === 'undefined') {
            continue;  
        }
        jsName = LEMalias2varName[arg];
        if (typeof LEMvarNameAttr[jsName] === 'undefined') {
            continue;   
        }
        attr = LEMvarNameAttr[jsName];
        if (!LEMval(attr.sgqa + '.relevanceStatus')) {
            return true;
        }
    }
    return false;
}

function  LEMsetTabIndexes()
{
    if (typeof tabIndexesSet == 'undefined') {
        $('#limesurvey :input[type!=hidden][id!=runonce]').each(function(index){
            $(this).bind('keydown',function(e) {
                if (e.keyCode == 9) {
                    checkconditions($(this).attr('value'), $(this).attr('name'), $(this).attr('type'), 'TAB');
                    $(this).focus();
                    return true;
                }
                return true;
            })
        })	
        tabIndexesSet = true;
    }
}

function LEMflagMandOther(sgqa,checked)
{
	if (checked) {
		if ($.trim($('#java'+sgqa).val()) == '') {
			$('#answer'+sgqa).addClass('em_sq_validation error').removeClass('good');
		}
		else {
			$('#answer'+sgqa).addClass('em_sq_validation good').removeClass('error');
		}
	}
	else {
		$('#answer'+sgqa).addClass('em_sq_validation good').removeClass('error');
	}
}


function is_bool (mixed_var) {
    
    return (typeof mixed_var === 'boolean');
}

function addslashes (str) {
   
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function html_entity_decode (string, quote_style) {
   
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

   
    delete(hash_map['&']);
    hash_map['&'] = '&amp;';

    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }
    tmp_str = tmp_str.split('&#039;').join("'");

    return tmp_str;
}

function htmlentities (string, quote_style, charset, double_encode) {
    
    var hash_map = {},
        symbol = '',
        entity = '',
        self = this;
    string += '';
    double_encode = !!double_encode || double_encode == null;

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
    hash_map["'"] = '&#039;';

    if (double_encode) {
        for (symbol in hash_map) {
            entity = hash_map[symbol];
            string = string.split(symbol).join(entity);
        }
    } else {
        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);|$)/g, function (ignore, text, entity) {
            return self.htmlentities(text, quote_style, charset) + entity;
        });
    }

    return string;
}

function get_html_translation_table (table, quote_style) {
   
    var entities = {},
        hash_map = {},
        decimal = 0,
        symbol = '';
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

   
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
       
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


   
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }

    return hash_map;
}

function htmlspecialchars (string, quote_style, charset, double_encode) {
   
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined' || quote_style === null) {
        quote_style = 3;   
    }
    string = string.toString();
    if (double_encode !== false) {
        string = string.replace(/&/g, '&amp;');
    }
    string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { 
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
           
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            }
            else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;');
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;');
    }

    return string;
}

function htmlspecialchars_decode (string, quote_style) {
    
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined') {
        quote_style = 3;    
    }
    string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { 
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
           
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            } else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/&#0*39;/g, "'"); }
    if (!noquotes) {
        string = string.replace(/&quot;/g, '"');
    }
   
    string = string.replace(/&amp;/g, '&');

    return string;
}

function ltrim (str, charlist) {
  
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    var re = new RegExp('^[' + charlist + ']+', 'g');
    return (str + '').replace(re, '');
}

function nl2br (str, is_xhtml) {
   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '' : '<br>';

    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function number_format (number, decimals, dec_point, thousands_sep) {
    
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
   
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function quoted_printable_decode (str) {
   
    var RFC2045Decode1 = /=\r\n/gm,
        
        RFC2045Decode2IN = /=([0-9A-F]{2})/gim,
        
        RFC2045Decode2OUT = function (sMatch, sHex) {
            return String.fromCharCode(parseInt(sHex, 16));
        };
    return str.replace(RFC2045Decode1, '').replace(RFC2045Decode2IN, RFC2045Decode2OUT);
}

function quoted_printable_encode (str) {
   
    var hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
        RFC2045Encode1IN = / \r\n|\r\n|[^!-<>-~ ]/gm,
        RFC2045Encode1OUT = function (sMatch) {
           
            if (sMatch.length > 1) {
                return sMatch.replace(' ', '=20');
            }
          
            var chr = sMatch.charCodeAt(0);
            return '=' + hexChars[((chr >>> 4) & 15)] + hexChars[(chr & 15)];
        },
      RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g,
        RFC2045Encode2OUT = function (sMatch) {
            if (sMatch.substr(sMatch.length - 2) === '\r\n') {
                return sMatch;
            }
            return sMatch + '=\r\n';
        };
    str = str.replace(RFC2045Encode1IN, RFC2045Encode1OUT).replace(RFC2045Encode2IN, RFC2045Encode2OUT);
 
    return str.substr(0, str.length - 3);
}

function quotemeta (str) {
    
    return (str + '').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
}

function round (value, precision, mode) {
  
    var m, f, isHalf, sgn; 
    precision |= 0; 
    m = Math.pow(10, precision);
    value *= m;
    sgn = (value > 0) | -(value < 0); 
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);

    if (isHalf) {
        switch (mode) {
        case 'PHP_ROUND_HALF_DOWN':
            value = f + (sgn < 0); 
            break;
        case 'PHP_ROUND_HALF_EVEN':
            value = f + (f % 2 * sgn); 
            break;
        case 'PHP_ROUND_HALF_ODD':
            value = f + !(f % 2);
            break;
        default:
            value = f + (sgn > 0); 
        }
    }

    return (isHalf ? value : Math.round(value)) / m;
}

function rtrim (str, charlist) {
 
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return (str + '').replace(re, '');
}

function sprintf () {
   
    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments,
        i = 0,
        format = a[i++];

   
    var pad = function (str, len, chr, leftJustify) {
        if (!chr) {
            chr = ' ';
        }
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };

 
    var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = pad(value, minWidth, customPadChar, leftJustify);
            } else {
                value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    };

  
    var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        
        var number = value >>> 0;
        prefix = prefix && number && {
            '2': '0b',
            '8': '0',
            '16': '0x'
        }[base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };

  
    var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
    };

    
    var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
        var number;
        var prefix;
        var method;
        var textTransform;
        var value;

        if (substring == '%%') {
            return '%';
        }

      
        var leftJustify = false,
            positivePrefix = '',
            zeroPad = false,
            prefixBaseX = false,
            customPadChar = ' ';
        var flagsl = flags.length;
        for (var j = 0; flags && j < flagsl; j++) {
            switch (flags.charAt(j)) {
            case ' ':
                positivePrefix = ' ';
                break;
            case '+':
                positivePrefix = '+';
                break;
            case '-':
                leftJustify = true;
                break;
            case "'":
                customPadChar = flags.charAt(j + 1);
                break;
            case '0':
                zeroPad = true;
                break;
            case '#':
                prefixBaseX = true;
                break;
            }
        }

        
        if (!minWidth) {
            minWidth = 0;
        } else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }

       
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }

        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }

        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : undefined;
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }

        
        value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

        switch (type) {
        case 's':
            return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
        case 'c':
            return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
        case 'b':
            return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'o':
            return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'x':
            return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'X':
            return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
        case 'u':
            return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'i':
        case 'd':
            number = (+value) | 0;
            prefix = number < 0 ? '-' : positivePrefix;
            value = prefix + pad(String(Math.abs(number)), precision, '0', false);
            return justify(value, prefix, leftJustify, minWidth, zeroPad);
        case 'e':
        case 'E':
        case 'f':
        case 'F':
        case 'g':
        case 'G':
            number = +value;
            prefix = number < 0 ? '-' : positivePrefix;
            method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
            textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
            value = prefix + Math.abs(number)[method](precision);
            return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
        default:
            return substring;
        }
    };

    return format.replace(regex, doFormat);
}

function str_pad (input, pad_length, pad_string, pad_type) {
    
    var half = '',
        pad_to_go;

    var str_pad_repeater = function (s, len) {
        var collect = '',
            i;

        while (collect.length < len) {
            collect += s;
        }
        collect = collect.substr(0, len);

        return collect;
    };

    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';

    if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
        pad_type = 'STR_PAD_RIGHT';
    }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type == 'STR_PAD_LEFT') {
            input = str_pad_repeater(pad_string, pad_to_go) + input;
        } else if (pad_type == 'STR_PAD_RIGHT') {
            input = input + str_pad_repeater(pad_string, pad_to_go);
        } else if (pad_type == 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }

    return input;
}

function str_repeat (input, multiplier) {
  
    return new Array(multiplier + 1).join(input);
}

function strcasecmp (f_string1, f_string2) {
   
    var string1 = (f_string1 + '').toLowerCase();
    var string2 = (f_string2 + '').toLowerCase();

    if (string1 > string2) {
        return 1;
    } else if (string1 == string2) {
        return 0;
    }

    return -1;
}

function strcmp (str1, str2) {
    
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

function strip_tags (input, allowed) {
    
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function stripslashes (str) {
  
    return (str + '').replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
        case '\\':
            return '\\';
        case '0':
            return '\u0000';
        case '':
            return '';
        default:
            return n1;
        }
    });
}

function stripos (f_haystack, f_needle, f_offset) {
 
    var haystack = (f_haystack + '').toLowerCase();
    var needle = (f_needle + '').toLowerCase();
    var index = 0;

    if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
        return index;
    }
    return false;
}

function stristr (haystack, needle, bool) {
   
    var pos = 0;

    haystack += '';
    pos = haystack.toLowerCase().indexOf((needle + '').toLowerCase());
    if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

function strrev (string) {
   
    string = string + '';

    
    var grapheme_extend = /(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;
    string = string.replace(grapheme_extend, '$2$1'); 
    return string.split('').reverse().join('');
}

function strstr (haystack, needle, bool) {
  
    var pos = 0;

    haystack += '';
    pos = haystack.indexOf(needle);
    if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

function strtotime (text, now) {
    
    var match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
    if (match && match[2]==match[4]) {
        if (match[1]>1901) {
            switch (match[2]) {
                case '-': {  
                    if (match[3]>12 | match[5]>31) return(0);
                    return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
                case '.': {  
                    return(0);
                    break;
                }
                case '/': { 
                    if (match[3]>12 | match[5]>31) return(0);
                    return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
            }
        }
        else if (match[5]>1901) {
            switch (match[2]) {
                case '-': {  
                    if (match[3]>12 | match[1]>31) return(0);
                    return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
                case '.': {  
                    if (match[3]>12 | match[1]>31) return(0);
                    return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
                case '/': { 
                    if (match[1]>12 | match[3]>31) return(0);
                    return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
            }
        }
        else {
            switch (match[2]) {
                case '-': { 
                    if (match[3]>12 | match[5]>31 | (match[1] < 70 & match[1]>38)) return(0);
                    var year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                    return new Date(year, parseInt(match[3], 10) - 1, match[5],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
                case '.': { 
                    if (match[5]>=70) {   
                        if (match[3]>12 | match[1]>31) return(0);
                        return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    else if (match[5]<60 & !(match[6])) {  
                        if (match[1]>23 | match[3]>59) return(0);
                        var today = new Date();
                        return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                        match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                    }
                    else  return(0); 
                    break;
                }
                case '/': {  
                    if (match[1]>12 | match[3]>31 | (match[5] < 70 & match[5]>38)) return(0);
                    var year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                    return new Date(year, parseInt(match[1], 10) - 1, match[3],
                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    break;
                }
                case ':': { 
                    if (match[1]>23 | match[3]>59 | match[5]>59) return(0);
                    var today = new Date();
                    return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                    match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                    break;
                }
            }
        }
    }
    
    
   
    if (text === 'now')
        return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
    else if (!isNaN(parse = Date.parse(text)))
        return parse / 1000 | 0;
    
    var date = now ? new Date(now * 1000) : new Date();
    var days = {
        'sun': 0,
        'mon': 1,
        'tue': 2,
        'wed': 3,
        'thu': 4,
        'fri': 5,
        'sat': 6
    };
    var ranges = {
        'yea': 'FullYear',
        'mon': 'Month',
        'day': 'Date',
        'hou': 'Hours',
        'min': 'Minutes',
        'sec': 'Seconds'
    };

    function lastNext(type, range, modifier) {
        var day = days[range];

        if (typeof(day) !== 'undefined') {
            var diff = day - date.getDay();

            if (diff === 0)
                diff = 7 * modifier;
            else if (diff > 0 && type === 'last')
                diff -= 7;
            else if (diff < 0 && type === 'next')
                diff += 7;

            date.setDate(date.getDate() + diff);
        }
    }
    function process(val) {
        var split = val.split(' ');
        var type = split[0];
        var range = split[1].substring(0, 3);
        var typeIsNumber = /\d+/.test(type);

        var ago = split[2] === 'ago';
        var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

        if (typeIsNumber)
            num *= parseInt(type, 10);

        if (ranges.hasOwnProperty(range))
            return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
        else if (range === 'wee')
            return date.setDate(date.getDate() + (num * 7));

        if (type === 'next' || type === 'last')
            lastNext(type, range, num);
        else if (!typeIsNumber)
            return false;

        return true;
    }

    var regex = '([+-]?\\d+\\s' +
        '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
        '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
        '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s' +
        '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
        '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
        '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?';

    match = text.match(new RegExp(regex, 'gi'));
    if (!match)
        return false;

    for (var i = 0, len = match.length; i < len; i++)
        if (!process(match[i]))
            return false;


    return (date.getTime() / 1000);
}

function substr (str, start, len) {
   
    var i = 0,
        allBMP = true,
        es = 0,
        el = 0,
        se = 0,
        ret = '';
    str += '';
    var end = str.length;

   
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
   
    switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
    case 'on':
        
        for (i = 0; i < str.length; i++) {
            if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                allBMP = false;
                break;
            }
        }

        if (!allBMP) {
            if (start < 0) {
                for (i = end - 1, es = (start += end); i >= es; i--) {
                    if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                        start--;
                        es--;
                    }
                }
            } else {
                var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                while ((surrogatePairs.exec(str)) != null) {
                    var li = surrogatePairs.lastIndex;
                    if (li - 2 < start) {
                        start++;
                    } else {
                        break;
                    }
                }
            }

            if (start >= end || start < 0) {
                return false;
            }
            if (len < 0) {
                for (i = end - 1, el = (end += len); i >= el; i--) {
                    if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                        end--;
                        el--;
                    }
                }
                if (start > end) {
                    return false;
                }
                return str.slice(start, end);
            } else {
                se = start + len;
                for (i = start; i < se; i++) {
                    ret += str.charAt(i);
                    if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                        se++;
                    }
                }
                return ret;
            }
            break;
        }
        
    case 'off':
       
    default:
        if (start < 0) {
            start += end;
        }
        end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
       
        return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
    }
    return undefined; 
}

function trim (str, charlist) {
var whitespace, l = 0,
i = 0;
str += '';

if (!charlist) {

whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
} else {

charlist += '';
whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
}

l = str.length;
for (i = 0; i < l; i++) {
if (whitespace.indexOf(str.charAt(i)) === -1) {
str = str.substring(i);
break;
}
}

l = str.length;
for (i = l - 1; i >= 0; i--) {
if (whitespace.indexOf(str.charAt(i)) === -1) {
str = str.substring(0, i + 1);
break;
}
}

return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function ucwords (str) {
    
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function checkdate (m, d, y) {
   
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function date (format, timestamp) {
   
    var that = this,
        jsdate, f, formatChr = /\\?([a-z])/gi,
        formatChrCb,
        
        _pad = function (n, c) {
            if ((n = n + '').length < c) {
                return new Array((++c) - n.length).join('0') + n;
            }
            return n;
        },
        txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    f = {
        
        d: function () { 
            return _pad(f.j(), 2);
        },
        D: function () {
            return f.l().slice(0, 3);
        },
        j: function () { 
            return jsdate.getDate();
        },
        l: function () { 
            return txt_words[f.w()] + 'day';
        },
        N: function () { 
            return f.w() || 7;
        },
        S: function () { 
            var j = f.j();
            return j > 4 || j < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[j % 10] || 'th';
        },
        w: function () {
            return jsdate.getDay();
        },
        z: function () { 
            var a = new Date(f.Y(), f.n() - 1, f.j()),
                b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5) + 1;
        },

      
        W: function () { 
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },

       
        F: function () {
            return txt_words[6 + f.n()];
        },
        m: function () { 
            return _pad(f.n(), 2);
        },
        M: function () { 
            return f.F().slice(0, 3);
        },
        n: function () { 
            return jsdate.getMonth() + 1;
        },
        t: function () {
            return (new Date(f.Y(), f.n(), 0)).getDate();
        },

       
        L: function () { 
            return new Date(f.Y(), 1, 29).getMonth() === 1 | 0;
        },
        o: function () { 
            var n = f.n(),
                W = f.W(),
                Y = f.Y();
            return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
        },
        Y: function () { 
            return jsdate.getFullYear();
        },
        y: function () { 
            return (f.Y() + "").slice(-2);
        },

        
        a: function () { 
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function () {
            return f.a().toUpperCase();
        },
        B: function () { 
            var H = jsdate.getUTCHours() * 36e2,
               
                i = jsdate.getUTCMinutes() * 60,
                
                s = jsdate.getUTCSeconds(); 
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () { 
            return f.G() % 12 || 12;
        },
        G: function () { 
            return jsdate.getHours();
        },
        h: function () { 
            return _pad(f.g(), 2);
        },
        H: function () { 
            return _pad(f.G(), 2);
        },
        i: function () { 
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () { 
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () { 
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },

       
        e: function () { 
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function () { 
            var a = new Date(f.Y(), 0),
                
                c = Date.UTC(f.Y(), 0),
               
                b = new Date(f.Y(), 6),
               
                d = Date.UTC(f.Y(), 6); 
            return 0 + ((a - c) !== (b - d));
        },
        O: function () { 
            var a = jsdate.getTimezoneOffset();
            return (a > 0 ? "-" : "+") + _pad(Math.abs(a / 60 * 100), 4);
        },
        P: function () {
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },
        T: function () {
            return 'UTC';
        },
        Z: function () { 
            return -jsdate.getTimezoneOffset() * 60;
        },

        
        c: function () { 
            return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () { 
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () { 
            return jsdate.getTime() / 1000 | 0;
        }
    };
    this.date = function (format, timestamp) {
        that = this;
        jsdate = ((typeof timestamp === 'undefined') ? new Date() : 
        (timestamp instanceof Date) ? new Date(timestamp) : 
        new Date(timestamp * 1000) 
        );
        return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);
}

function gmdate (format, timestamp) {
   
    var dt = typeof timestamp === 'undefined' ? new Date() :
                        typeof timestamp === 'object' ? new Date(timestamp) : 
                        new Date(timestamp * 1000);
    timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
    return this.date(format, timestamp);
}

function idate (format, timestamp) {
 
    if (format === undefined) {
        throw 'idate() expects at least 1 parameter, 0 given';
    }
    if (!format.length || format.length > 1) {
        throw 'idate format is one char';
    }

   
    var date = ((typeof timestamp === 'undefined') ? new Date() : 
    (timestamp instanceof Date) ? new Date(timestamp) : 
    new Date(timestamp * 1000) 
    ),
        a;

    switch (format) {
    case 'B':
        return Math.floor(((date.getUTCHours() * 36e2) + (date.getUTCMinutes() * 60) + date.getUTCSeconds() + 36e2) / 86.4) % 1e3;
    case 'd':
        return date.getDate();
    case 'h':
        return date.getHours() % 12 || 12;
    case 'H':
        return date.getHours();
    case 'i':
        return date.getMinutes();
    case 'I':
      
        a = date.getFullYear();
        return 0 + (((new Date(a, 0)) - Date.UTC(a, 0)) !== ((new Date(a, 6)) - Date.UTC(a, 6)));
    case 'L':
        a = date.getFullYear();
        return (!(a & 3) && (a % 1e2 || !(a % 4e2))) ? 1 : 0;
    case 'm':
        return date.getMonth() + 1;
    case 's':
        return date.getSeconds();
    case 't':
        return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
    case 'U':
        return Math.round(date.getTime() / 1000);
    case 'w':
        return date.getDay();
    case 'W':
        a = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 7) + 3);
        return 1 + Math.round((a - (new Date(a.getFullYear(), 0, 4))) / 864e5 / 7);
    case 'y':
        return parseInt((date.getFullYear() + '').slice(2), 10);
    case 'Y':
        return date.getFullYear();
    case 'z':
        return Math.floor((date - new Date(date.getFullYear(), 0, 1)) / 864e5);
    case 'Z':
        return -date.getTimezoneOffset() * 60;
    default:
        throw 'Unrecognized date format token';
    }
}

function mktime () {
    
    var d = new Date(),
        r = arguments,
        i = 0,
        e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

    for (i = 0; i < e.length; i++) {
        if (typeof r[i] === 'undefined') {
            r[i] = d['get' + e[i]]();
            r[i] += (i === 3);
        } else {
            r[i] = parseInt(r[i], 10);
            if (isNaN(r[i])) {
                return false;
            }
        }
    }

  
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

    
    d.setFullYear(r[5], r[3] - 1, r[4]);

    
    d.setHours(r[0], r[1], r[2]);

  
    return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
}

function rand (min, max) {
   
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function time () {
   
    return Math.floor(new Date().getTime() / 1000);
}


function updateHeadings(tab, rep)
{
    tab.find('.repeat').remove();
    var header = tab.find('thead>tr');
    var trs = tab.find('tr:visible');
    trs.each(function(i, tr)
    {
       
        if(i != 0 && i % rep == 0 && i != trs.length-1)
        {
            header.clone().addClass('repeat').addClass('headings').insertAfter(tr);
        }
    });
}


function updateColors(tab)
{
    var trs = tab.find('tr:visible');
    trs.each(function(i, tr)
    {
       
        $(tr).removeClass('array1').removeClass('array2').addClass('array' + (1 + i % 2));
    });
}
