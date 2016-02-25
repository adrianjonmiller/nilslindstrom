Js.Behaviors.test = function(container) {
	// console.log("success");
}

Js.Behaviors.success = function(container) {
	console.log("it worked!");
}

Js.Behaviors.change = function(container) {

	$(container).on('click', function(){
		Js.Views.test.render("/template.html");
	});
}




Js.Behaviors.event = function(container) {
	Js.Data.test = {
		test: "Joe",
		calc: "6"
	};
	
	Js.Views.test.render("/template2.html", function(view, result){
		view.appendChild(result);
		var html = view.innerHTML;
		view.innerHTML = Mustache.render(html, Js.Data.test);
		Js.Data.test.watch('test', function(id, oldVal, newVal){
			console.log(Js.Data.test.test);
			view.innerHTML = Mustache.render(html, Js.Data.test);
			return newVal;
		});
	});
}



Js.Behaviors.changeAgain = function(container) {
	$(container).on('click', function(){
		Js.Data.test.test = "Tammy";
		console.log(Js.Data.test.test);
	});
}


Js.Behaviors.changeTotal = function(container) {
	$(container).on('click', function(){
		Js.Data.test.test = "Success";
		console.log(Js.Data.test.test);
	});
}
