let myapp = {
    myfunction : function () {
			ztapi.getNetworks();
		}
};


var	getNetworks = function() {
	console.log("****    Inside the getNetworks function.");
	let token = configs.apiKey;
	Neutralino.os.runCommand('curl -H "Authorization: bearer ' + token + '" -X GET https://my.zerotier.com/api/network',
		function(data) {
			let info = JSON.parse(data.stdout);
			let mainNetworkLength = info.length;
			for (i=0; i < mainNetworkLength; i++) {
				let ipRangeLength = info[i].config.ipAssignmentPools.length;
				document.getElementById('networkName').innerHTML = "<span id='" + info[i].config.name + "'>" + info[i].config.name + "</span>";
				for (j=0; j < ipRangeLength; j++) {
					document.getElementById('networkIPRanges').innerHTML = info[i].config.ipAssignmentPools[j].ipRangeStart + " to " + info[i].config.ipAssignmentPools[j].ipRangeEnd + "<br />";
				}
			}
		},
		function() {
			console.error(error);
		}
	);
}

var getDevices = function() {
	let token = configs.apiKey;
	Neutralino.os.runCommand("curl -H 'Authorization: bearer " + token + "' -X GET https://my.zerotier.com/api/network/" + networkId + "/member",
		function(data) {;
			let info = JSON.parse(data.stdout);
			console.log("array length: " + info.length);;
			for (i=0; i < info.length; i++) {
				console.log("Device Name:   " + info[i].name);
				console.log("Device Online: " + info[i].online);
				console.log("-------------------------------");
			}
		},
		function() {
			console.error(error);
		}
	);
}

var	getUsers = function() {
	
	
}

document.getElementById("networkName").onclick = function() {
	console.log("event.target: ");
	console.dir(event.target.id);
}

Neutralino.init({
    load: function() {
        getNetworks();
    },
});
