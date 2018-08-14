'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class ZW139 extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
	}
	
}

module.exports = ZW139;