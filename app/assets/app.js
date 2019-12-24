let myapp = {
    myfunction : function () {

		}
};
    

Neutralino.init({
    load: function() {
        myapp.myfunction();
    },
    pingSuccessCallback : function() {

    },
    pingFailCallback : function() {

    }
});

let ztapi = {
	getNetworks : function() {
		const networks = async () => {
  			const response = await fetch('https://my.zerotier.com/api/network/<my user id>>', {
    			method: 'POST',
    			body: myBody, // string or object
    			headers: {
      			'Authentication': 'bearer < my user api token >'
    			}
  			});
  			const myJson = await response.json(); //extract JSON from the http response
  			// do something with myJson
		
		}
	},
	getDevices : function() {
	
	},
	getUsers : function() {
	
	},
	
}