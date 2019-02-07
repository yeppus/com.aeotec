'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;
const DEFAULT_COLOR_DURATION = 0;

class AeotecLEDBulb6MultiWhiteDevice extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('onoff', 'BASIC');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL');

		this.registerMultipleCapabilityListener(['light_temperature'], async (values, options) => {
            let temp = {cw: 0, ww: 0, colortemp: 2700};

            if (typeof values.light_temperature === 'number') {
                if (values.light_temperature < .5) {
                    temp.cw = 255;
                    temp.ww = 0;
                    temp.colortemp = this._map(0, 0.5, 6500, 5000, values.light_temperature)
                    await this.configurationSet({index: 82, size: 2}, temp.colortemp)
                } else {
                    temp.cw = 0;
                    temp.ww = 255;
                    temp.colortemp = this._map(0.5, 1, 4999, 2700, values.light_temperature)
                    await this.configurationSet({index: 81, size: 2}, temp.colortemp)
                }
            }

            // Send values
            return await this._sendColors({warm: temp.ww, cold: temp.cw});
        });

        this.registerSetting("80", (input) => new Buffer([(input) ? 1 : 0]));
	}

	async _sendColors({ warm, cold }) {
		const SwitchColorVersion = this.getCommandClass('SWITCH_COLOR').version || 1;

		let setCommand = {
			Properties1: {
				'Color Component Count': 2,
			},
			vg1: [
				{
					'Color Component ID': 0,
					Value: Math.round(warm),
				},
				{
					'Color Component ID': 1,
					Value: Math.round(cold),
				},
			],
		};

		if (SwitchColorVersion > 1) {
			setCommand.duration = typeof duration !== 'number' ? DEFAULT_COLOR_DURATION : Utils.calculateZwaveDimDuration(duration);
		}

		// Fix broken CC_SWITCH_COLOR_V2 parser
		if (SwitchColorVersion === 2) {
			setCommand = new Buffer([setCommand.Properties1['Color Component Count'], 0, setCommand.vg1[0].Value, 1, setCommand.vg1[1].Value, setCommand.duration]);
		}

		return this.node.CommandClass.COMMAND_CLASS_SWITCH_COLOR.SWITCH_COLOR_SET(setCommand);
	}


	_map(inputStart, inputEnd, outputStart, outputEnd, input) {
        return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);
    }
}

module.exports = AeotecLEDBulb6MultiWhiteDevice;
