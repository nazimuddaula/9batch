function admin_signin() {
  user = document.getElementById('username').value;
  pass = document.getElementById('password').value;
  if ( (user == '') || (pass == '') ) {
	document.getElementById('loginmsg_tr').style.display = 'block';
	document.getElementById('login_msg').innerHTML =  'Username and Password Fields Empty.';
	return false;
  }
  document.getElementsByTagName('body').item(0).style.cursor = "wait";
  signin = (window.XMLHttpRequest ? new XMLHttpRequest(): ((window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : null) );
  if (signin) { 
     signin.onreadystatechange = state_change_signin;
     signin.open("POST",'admin_login.php',true);
     signin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     signin.send('username='+user+'&password='+pass);
  }
}
function state_change_signin() {
  if ( signin.readyState == 4 ) {
	 if (signin.status == 200) { 
	   if (signin.responseText == '9f7d0ee82b6a6ca7ddeae841f3253059' ) { // md5 of 'valid' coming form admin_login.php
	     location.href = './start.php';
	   }
	   else { 
	     document.getElementById('loginmsg_tr').style.display = 'block';
	     document.getElementById('login_msg').innerHTML =  signin.responseText;
	   }
	}
   document.getElementsByTagName('body').item(0).style.cursor = "default";
  }
}
/*..........................................................................*/
function show_hide_left(change_img) { 
   if ( $('leftcolumn').visible() ) { 
	   $(change_img).src = './images/show.gif';
	   Element.setStyle($('content'),{background:'url()'});
       $('leftcolumn').style.display = 'none';
       Element.setStyle($('leftcolumn'),{width: '0px'});
	   Element.setStyle($('contentpanel'),{marginLeft: '30px'});
   }
   else { 
	   Element.setStyle($('content'),{background:'url(./images/lef-nav-bg.gif) repeat-y'})
	   Element.setStyle($('content'),{overflow:'hidden'})
	   Element.setStyle($('content'),{position:'relative'})
	   Element.setStyle($('content'),{backgroundColor:'#30353B'})
	   $(change_img).src = './images/hide.gif';
       $('leftcolumn').style.display = 'block';
       Element.setStyle($('contentpanel'),{marginLeft: '265px'});
       Element.setStyle($('leftcolumn'),{width: '235px'});
   }
}

/*....................................................................................*/
// function for show and hide a box. normally the appear fade mode is using here. but it can be change by changing just the mode 
function hide_show_obj(div_to_hide, change_img) { 
  $(change_img).src =  ( $(div_to_hide).visible() ) ?  './images/maximize.gif' : './images/minimize.gif';
  new Effect.toggle(div_to_hide, 'appear');
}

/*..............................................................................................  */
function add_new_gadget_category() { 
  var new_gd_name = $('add_new_gd').value;
  if ( (new_gd_name == '') || (new_gd_name == null) ) { 
     alert('Name Shouldnt be Empty.');
	 return false;
  }
  $('add_new_status').inerHTML = '<img src="./images/indicator.gif" border="0" />&nbsp;Processing...Please Wait....';
  var parms = 'catname='+new_gd_name.replace('&','**');
  new Ajax.Request('add-new-gadget-category.php', {method: 'post', parameters: parms, onComplete: newgc_req});
}
function newgc_req(newgcreq) { 
   returned = newgcreq.responseText;
   if ( returned == 'Exists') { 
      alert('Already You Have the Category. Try with Another Name.'); 
	  return;
   }
   else if ( returned == 'Error'){ 
      alert('Experienced MySql Insertion Error.'); 
	  return;
   }
   else { 
	  $('block_category_holder').innerHTML = returned;
   }
  $('add_new_status').inerHTML = '';

}
/*..............................................................................................  */

function submit_form() { 
 if ( ($('gad_title').value == '') ||  ($('gad_body').value == '') || ($('gad_img_view').value == '') ){ 
    alert('Required Value Missing!!');
    return false;
 }	
 $('add_gd').submit(); 

}
