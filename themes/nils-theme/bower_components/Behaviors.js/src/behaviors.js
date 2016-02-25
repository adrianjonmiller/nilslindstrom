var Js = window.Js || {};
Js.Behaviors = {};
Js.Views = {};

// Ready function
Js.Ready = function(fn) {
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
Js._compile = function(view, request) {
  Js.Request(request, function(response) {
    var template = Handlebars.compile(response);
    view.innerHTML(template(Js.Data));
      // view = template(Js.Data);
    view.watch("", function(id, oldval, newval){

    });
  });
}



// Loops through the data-behavior creates a instance of a function based the values it finds
Js._init = function (context) {
  if (!context) {
    context = document;
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

  var views = document.querySelectorAll('[data-view]');
  for(i=0; i<views.length; i++) {
    var view = views[i];
    var states = view.getAttribute('data-view').split(' ');
    for(j=0; j<states.length; j++) {
      var state = states[i];
      Js.Views[state] = _view(view);
      console.log(Js.Views);
    }
  }
}


// Runs initializeBehaviors after DOM Ready
Js.Ready(function(){
  var start = +new Date();
  Js._init();
  var end =  +new Date();  // log end timestamp
  var diff = end - start;
  console.log(diff);
});


var params = {
  template: "",
  data: "",
  view: ""
};

function _render(params, view){
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

// View container
function _view(view) {
  view.render = function(params){
    if(params.template) {
      Js._request(params.template, function(result){
        var parser = new DOMParser();
        var dom = parser.parseFromString(result, "text/xml");
        if(params.data && Handlebars) {
          var template = Handlebars.compile(result);
          params.view.innerHTML(template(params.data));
        } else {
          view.append = dom;
        }
      })
    }
  }
  return view;
}


//Returns true if it is a DOM element
function _isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}
