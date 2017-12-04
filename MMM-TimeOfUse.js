/* global Log, Module, moment, config */
/* Magic Mirror
 * Module: MMM-TimeOfUse
 *
 * MIT Licensed.
 */
Module.register("MMM-TimeOfUse",{
	// Module config defaults.
	defaults: {
		updateInterval: 3000000, // 5 min
		fallStart: "2017-11-01 00:00:00", // YYYY-MM-DD HH:MM:SS
		springStart: "2018-05-01 00:00:00", // YYYY-MM-DD HH:MM:SS
		
		
	},
	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},
	// Define styles.
	getStyles: function() {
		return ["MMM-TimeOfUse.css"];
	},
	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		// Schedule update interval 
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);

		// Set locale.
		moment.locale(config.language);

	},
	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("div");

		var hydroWrapper = document.createElement("div");
		// Style Wrappers
		
		var now = moment();
		if (this.config.timezone) {
			now.tz(this.config.timezone);
		}

		hydroWrapper.innerHTML = "&nbsp•";
		// normalize dates
		var springStart = new moment(this.config.springStart);
		springStart = springStart.year(now.year());
		var fallStart = new moment(this.config.fallStart);
		fallStart = fallStart.year(now.year());
		
		
		if (now.day() === 0 || now.day() === 6){
				hydroWrapper.classList.add('fixed', 'large', 'offPeak');
				//hydroWrapper.innerHTML = "•";
		}				
		else if (springStart <= now && fallStart > now){
			//hydroWrapper.innerHTML = "•";
			if (now.hour() >= 0 && now.hour() < 7){
				hydroWrapper.classList.add('fixed', 'large', 'offPeak');
			}
			else if (now.hour() >=7 && now.hour() < 11)
			{
				hydroWrapper.classList.add('fixed', 'large', 'midPeak');
			}
			else if (now.hour() >=11 && now.hour() <17){
				hydroWrapper.classList.add('fixed', 'large', 'onPeak');
			}
			else if (now.hour() >=17 && now.hour() <19){
				hydroWrapper.classList.add('fixed', 'large', 'midPeak');
			}
			else if (now.hour() >=19){
				hydroWrapper.classList.add('fixed', 'large', 'offPeak');
			}
		}
		else{
			//hydroWrapper.innerHTML = "•";
			if (now.hour() >= 0 && now.hour() < 7){
				hydroWrapper.classList.add('fixed', 'large', 'offPeak');
			}
			else if (now.hour() >=7 && now.hour() < 11)
			{
				hydroWrapper.classList.add('fixed', 'large', 'onPeak');
			}
			else if (now.hour() >=11 && now.hour() <17){
				hydroWrapper.classList.add('fixed', 'large', 'midPeak');
			}
			else if (now.hour() >=17 && now.hour() <19){
				hydroWrapper.classList.add('fixed', 'large', 'onPeak');
			}
			else if (now.hour() >=19){
				hydroWrapper.classList.add('fixed', 'large', 'offPeak');
			}
		}	
		wrapper.appendChild(hydroWrapper);
			
		// Return the wrapper to the dom.
		return wrapper;
	}
});
