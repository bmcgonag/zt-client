let myapp = {
    myfunction : function () {
			ztapi.getNetworks();
		}
};

var getNetworks = function() {
	const networkInfo = new Vue({
		el: '#networkInfo',
		mounted: function() {
			this.getNetwork();
		},
		data: {
			networkNames: [],
			networkIds: [],
			networkIpRanges: [],
			devices: []
		}, 
		methods: {
			getNetwork: function() {
				let networkIds = this.networkIds;
				let networkIpRanges = this.networkIpRanges;
				let networkNames = this.networkNames;
				let token = configs.apiKey;
				Neutralino.os.runCommand('curl -H "Authorization: bearer ' + token + '" -X GET https://my.zerotier.com/api/network',
					function(data) {
						let info = JSON.parse(data.stdout);
						let mainNetworkLength = info.length;
						for (i=0; i < mainNetworkLength; i++) {
							ipRangeLength = info[i].config.ipAssignmentPools.length;
							networkIds.push(info[i].id);
							networkNames.push({name: info[i].config.name, id: info[i].id});
							for (j=0; j < ipRangeLength; j++) {
								networkIpRanges.push(info[i].config.ipAssignmentPools[j].ipRangeStart + " to " + info[i].config.ipAssignmentPools[j].ipRangeEnd);
							}
						}
					},
					function() {
						console.error(error);
					}
				);
			},
			getDevices: function(netId) {
				console.log("Button clicked for id: " + netId);
				let token = configs.apiKey;
				let devices = this.devices;
				Neutralino.os.runCommand('curl -H "Authorization: bearer ' + token + '" -X GET https://my.zerotier.com/api/network/' + netId + '/member',
					function(data) {
						let info = JSON.parse(data.stdout);
						for (i=0; i<info.length; i++) {
							
							if (info[i].online == true) { 
								thisOnline = "Online";
							} else {
								thisOnline = "Offline";
							}
							devices.push({name: info[i].name, ipAdd: info[i].config.ipAssignments[0], status: thisOnline, online: info[i].online})
							// document.getElementsByTagName('tbody')[0].innerHTML += "<tr><td> " + info[i].name + " </td><td> " + info[i].config.ipAssignments[0] + " </td><td> " + thisOnline + " </td></tr>";
						}
					},
					function() {
						console.error(error);
					}
				);
			},
			pullDeviceInfo: function(netId) {
				this.getDevices(netId);

				setInterval(function() {
					this.devices = [];
					this.getDevices(netId);
				}.bind(this), 20000);
			}
		},
	});
}


var	getUsers = function() {
	
	
}

Neutralino.init({
    load: function() {
        getNetworks();
    },
});
