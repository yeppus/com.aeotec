'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class ZW132 extends ZwaveDevice {
	
	onMeshInit() {
		if (this.node.isMultiChannelNode) {
            this.registerCapability('onoff', 'SWITCH_BINARY');
        } else {
            this.registerCapability('onoff', 'SWITCH_BINARY');
            this.registerCapability('measure_power', 'METER');
            this.registerCapability('meter_power', 'METER');
		}
	}
	
}

module.exports = ZW132;
