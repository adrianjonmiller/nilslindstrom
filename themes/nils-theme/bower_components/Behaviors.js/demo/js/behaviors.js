var Js = window.Js || {};
Js.Behaviors = {};
Js.Views = {};
Js.Data = {};

// Ready function
Js._ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// HTTP Request
Js._request = function(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      if( typeof cb === 'function' ) {
        cb(request.responseText);
      }
    } else {
      console.log(request);
    }
  };

  request.onerror = function() {
  };

  request.send();
}

// Compile
Js._compile = function(template, view) {
  var template = Handlebars.compile(template);
	return template(view);
}


// Loops through the data-behavior creates a instance of a function based the values it finds
Js._init = function (context) {
  if (!context) {
    context = document;
  }

  // Views loop
  var views = context.querySelectorAll('[data-view]');
  for(i=0; i<views.length; i++) {
    var view = views[i];
    var states = view.getAttribute('data-view').split(' ');
    for(j=0; j<states.length; j++) {
      var state = states[i];
      Js.Views[state] = _view(view);
    }
  }

  // Elements loop
  var elements = context.querySelectorAll('[data-behavior]');
  for(i=0; i<elements.length; i++) {
    var element = elements[i];
    var behaviors = element.getAttribute('data-behavior').split(' ');
    for(j=0; j<behaviors.length; j++) {
      var behavior = behaviors[j];
      if(!element[behavior]) {
        try {
          element[behavior] = new Js.Behaviors[behavior](element);
        } catch (e) {
          console.log(e.stack);
        }
      }
    }
  }
}


// Runs initializeBehaviors after DOM Ready
Js._ready(function(){
  var start = +new Date();
  Js._init();
  var end =  +new Date();  // log end timestamp
  var diff = end - start;
  console.log(diff/1000);
});

function _render(params){
  if(params.template) {
    Js._request(params.template, function(result){
      if(params.data && Handlebars) {
        var template = Handlebars.compile(result);
        params.view.innerHTML(template(params.data));
      } else {
        params.view.innerHTML(result);
      }
    });
  }
}

//Returns true if it is a DOM element
function _isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

// View container
function _view(view) {
  view.render = function(params, cb){
    if(params) {
      Js._request(params, function(result){
				var range = document.createRange();
				var frag = range.createContextualFragment(result);
				Js._init(frag);

				if(view.hasChildNodes())
					view.innerHTML = "";

				if( typeof cb === 'function' ) {
	        cb(view, frag);
	      }	else {
					view.appendChild(frag);
				}
      })
    }
  }
  return view;
}
