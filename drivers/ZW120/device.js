'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecContactSensorGenFiveDevice extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('measure_battery', 'BATTERY');

        this.registerCapability('alarm_contact', 'SENSOR_BINARY');
        this.registerCapability('alarm_tamper', 'NOTIFICATION');
	}
	
}

module.exports = AeotecContactSensorGenFiveDevice;