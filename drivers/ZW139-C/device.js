'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecNanoSwitchZW139Device extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
	}
	
}

module.exports = AeotecNanoSwitchZW139Device;