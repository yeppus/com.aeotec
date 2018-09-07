'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class ZW078 extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('onoff', 'BINARY_SWITCH');

        this.registerCapability('measure_power', 'SENSOR_MULTILEVEL');
        this.registerCapability('meter_power', 'METER');
    }
	
}

module.exports = ZW078;