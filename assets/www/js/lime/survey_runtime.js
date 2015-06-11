

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

function checkconditions(value, name, type, evt_type)
{
    if (typeof evt_type === 'undefined')
    {
        evt_type = 'onchange';
    }
    if (type == 'radio' || type == 'select-one')
    {
        $('#java'+name).val(value);
    }
    else if (type == 'checkbox')
    {
        if ($('#answer'+name).is(':checked'))
        {
            $('#java'+name).val('Y');
        } else
        {
            $('#java'+name).val('');
        }
    }
    else if (type == 'text' /*&& name.match(/other$/)*/) // Vietadpro modified
    {
        $('#java'+name).val(value);
    }
   
    if($.isFunction(ExprMgr_process_relevance_and_tailoring ))
        ExprMgr_process_relevance_and_tailoring(evt_type,name,type);
    else
        console.log('there is no function');
    
    
}
function fixnum_checkconditions(value, name, type, evt_type, intonly)
{
    newval = new String(value);
    if(!bNumRealValue)
    {
        if (typeof intonly !=='undefined' && intonly==1) {
            newval = newval.replace(intRegex,'');
        }
        else {
            newval = newval.replace(numRegex,'');
        }
        aNewval = newval.split(LEMradix);
        if(aNewval.length>0){
            newval=aNewval[0];
        }
        if(aNewval.length>1){
            newval=newval+"."+aNewval[1];
        }
        if (newval != '-' && newval != '.' && newval != '-.' && newval != parseFloat(newval)) {// Todo : do it in reg
            newval = '';
        }
    }
    if(bFixNumAuto)
    {
        displayVal = newval;
        if (LEMradix === ',') {
            displayVal = displayVal.split('.').join(',');
        }
        if (name.match(/other$/)) {
            $('#answer'+name+'text').val(displayVal);
        }
        $('#answer'+name).val(displayVal);
    }
    if (typeof evt_type === 'undefined')
    {
        evt_type = 'onchange';
    }
    checkconditions(newval, name, type, evt_type);
}
function manageIndex(){
    $("#index .jshide").hide();
    $("#index").on('click','li,.row',function(e){ 
        if(!$(e.target).is('button')){
            $(this).children("[name='move']").click();
        }
    });
    $(function() {
        $(".outerframe").addClass("withindex");
        var idx = $("#index");
        var row = $("#index .row.current");
        if(row.length)
            idx.scrollTop(row.position().top - idx.height() / 2 - row.height() / 2);
    });
}
function addClassEmpty()
{
	$('input.text[value=""]').addClass('empty');
	$('input[type=text][value=""]').addClass('empty');
	$('textarea').each(function(index) {
	if ($(this).val() == ""){
		$(this).addClass('empty');
	}
	});
	$("body").delegate("input[type=text],textarea","blur focusout",function(){
	if ($(this).val() == ""){
		$(this).addClass('empty');
	}else{
		$(this).removeClass('empty');
	}
	});
}



Array.prototype.push = function()
{
	var n = this.length >>> 0;
	for (var i = 0; i < arguments.length; i++)
	{
		this[n] = arguments[i];
		n = n + 1 >>> 0;
	}
	this.length = n;
	return n;
};

Array.prototype.pop = function() {
	var n = this.length >>> 0, value;
	if (n) {
		value = this[--n];
		delete this[n];
	}
	this.length = n;
	return value;
};


//defined in group.php & question.php & survey.php, but a static function
function inArray(needle, haystack)
{
	for (h in haystack)
	{
		if (haystack[h] == needle)
		{
			return true;
		}
	}
	return false;
}

//defined in group.php & survey.php, but a static function
function match_regex(testedstring,str_regexp)
{
	// Regular expression test
	if (str_regexp == '' || testedstring == '') return false;
	pattern = new RegExp(str_regexp);
	return pattern.test(testedstring)
}

function addHiddenField(theform,thename,thevalue)
{
	var myel = document.createElement('input');
	myel.type = 'hidden';
	myel.name = thename;
	theform.appendChild(myel);
	myel.value = thevalue;
}

function cancelBubbleThis(eventObject)
{
	if (!eventObject) var eventObject = window.event;
	eventObject.cancelBubble = true;
	if (eventObject && eventObject.stopPropagation) {
		eventObject.stopPropagation();
	}
}

function cancelEvent(e)
{
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function hookEvent(element, eventName, callback)
{
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.addEventListener)
  {
    
    element.addEventListener(eventName, callback, false);
  }
  else if(element.attachEvent)
    element.attachEvent("on" + eventName, callback);
}

function noScroll(e)
{
  e = e ? e : window.event;
  cancelEvent(e);
}


function getkey(e)
{
   if (window.event) return window.event.keyCode;
    else if (e) return e.which; else return null;
}

function goodchars(e, goods)
{
    

    // else return false
    return false;
}

function show_hide_group(group_id)
{
	var questionCount;

	// First let's show the group description, otherwise, all its childs would have the hidden status
	$("#group-" + group_id).show();
	// If all questions in this group are conditionnal
	// Count visible questions in this group
		questionCount=$("div#group-" + group_id).find("div[id^='question']:visible").size();

		if( questionCount == 0 )
		{
			$("#group-" + group_id).hide();
		}
}

// round function from phpjs.org
function round (value, precision, mode) {
    // http://kevin.vanzonneveld.net
    var m, f, isHalf, sgn; // helper variables
    precision |= 0; // making sure precision is integer
    m = Math.pow(10, precision);
    value *= m;
    sgn = (value > 0) | -(value < 0); // sign of the number
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);

    if (isHalf) {
        switch (mode) {
        case 'PHP_ROUND_HALF_DOWN':
            value = f + (sgn < 0); // rounds .5 toward zero
            break;
        case 'PHP_ROUND_HALF_EVEN':
            value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
            break;
        case 'PHP_ROUND_HALF_ODD':
            value = f + !(f % 2); // rounds .5 towards the next odd integer
            break;
        default:
            value = f + (sgn > 0); // rounds .5 away from zero
        }
    }

    return (isHalf ? value : Math.round(value)) / m;
}

/* Maxlengt on textarea */
function maxlengthtextarea(){
    // Calling this function at document.ready : use maxlength attribute on textarea
    // Can be replaced by inline javascript
    $("textarea[maxlength]").change(function(){ // global solution
        var maxlen=$(this).attr("maxlength");
        if ($(this).val().length > maxlen) {
            $(this).val($(this).val().substring(0, maxlen));
        }
    });
    $("textarea[maxlength]").keyup(function(){ // For copy/paste (not for all browser)
        var maxlen=$(this).attr("maxlength");
        if ($(this).val().length > maxlen) {
            $(this).val($(this).val().substring(0, maxlen));
        }
    });
    $("textarea[maxlength]").keydown(function(event){ // No new key after maxlength
        var maxlen=$(this).attr("maxlength");
        var k =event.keyCode;
        if (($(this).val().length >= maxlen) &&
         !(k == null ||k==0||k==8||k==9||k==13||k==27||k==37||k==38||k==39||k==40||k==46)) {
            // Don't accept new key except NULL,Backspace,Tab,Enter,Esc,arrows,Delete
            return false;
        }
    });
}
