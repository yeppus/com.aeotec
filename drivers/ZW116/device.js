'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class ZW116 extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}
	
}

module.exports = ZW116;