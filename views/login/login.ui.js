$(document).ready(function() {
  
  new customAlert();
  alert('<div class="alert-header">⚠</div><br><h2>WARNING: Do not store large value in this wallet!!!</h2><br>We\'re making every effort towards a secure design, and do not store any wallet file or data on this computer. Regardless, we cannot guarantee the security of your cryptocurrency in this stage of the project!<br><br>',
        {title: '', button: 'Yes, I understand'});
});  

function helpbutton() {
  alert('Welcome to this Internet of Coins node.<br><br>To sign in, you need to enter an account code and password that are both 16 characters long.<br><br>If you don\'t have sign in credentials yet, you can generate them by clicking on the NEW ACCOUNT button, and the new credentials will be filled in for you.<br><br>',
        {title: '', button: 'Close'});
}

// animation (init)
function animate_login() {
  $('#arc0').css('background-color',$('#combinator').css('color'));
  if ( blink('arc0') && rotate_login(0) && dial_login(0) ) {
	  // return true to confirm animation is running
	  return true;
	}
}

// animation (blink)
function blink(target) {
  var el = document.getElementById(target);
  if (el != null && typeof el.style!='undefined') {
    if(typeof el.style.visibility!='undefined' && el.style.visibility=='hidden') {
      el.style.visibility='visible';
    } else {
      el.style.visibility='hidden';
    }
  }
  setTimeout("blink('"+target+"')",400);
  return true;
}

// animation (rotation)
function rotate_login(turn) {
  var el = document.getElementById('arc3');
  var bgcl = $('#combinator').css('background-color');
  //alert(bgcl);
  if (el != null) {  
    if (el.style['border-left']=='1px solid '+bgcl) {
      el.style['border-left']='1px solid';
      el.style['border-right']='1px solid';
      el.style['border-top']='1px solid '+bgcl;
      el.style['border-bottom']='1px solid '+bgcl;
    } else {
      el.style['border-left']='1px solid '+bgcl;
      el.style['border-right']='1px solid '+bgcl;
      el.style['border-top']='1px solid';
      el.style['border-bottom']='1px solid';
    }
  }
  if ( turn==0 ) { turn = 1; } else { turn = 0; }
  setTimeout("rotate_login("+turn+")",1500);
  return true;
}

function dial_login(turn) {
  var el = document.getElementById('arc2');
  var bgcl = $('#combinator').css('background-color');
  if (turn==0) {
    el.style['border-left']='1px solid';
    el.style['border-top']='1px solid '+bgcl;
    el.style['border-right']='1px solid '+bgcl;
    el.style['border-bottom']='1px solid '+bgcl;
  } 
  if (turn==1) {
    el.style['border-left']='1px solid';
    el.style['border-top']='1px solid';
    el.style['border-right']='1px solid '+bgcl;
    el.style['border-bottom']='1px solid '+bgcl;
  }
  if (turn==2) {
    el.style['border-left']='1px solid';
    el.style['border-top']='1px solid';
    el.style['border-right']='1px solid';
    el.style['border-bottom']='1px solid '+bgcl;
  }
  if (turn==3) {
    el.style['border-left']='1px solid';
    el.style['border-top']='1px solid';
    el.style['border-right']='1px solid';
    el.style['border-bottom']='1px solid';
  }
  return true;
}
