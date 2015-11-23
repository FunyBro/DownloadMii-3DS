//    _____                      _                 _ __  __ _ _ 
//   |  __ \                    | |               | |  \/  (_|_)
//   | |  | | _____      ___ __ | | ___   __ _  __| | \  / |_ _ 
//   | |  | |/ _ \ \ /\ / / '_ \| |/ _ \ / _` |/ _` | |\/| | | |
//   | |__| | (_) \ V  V /| | | | | (_) | (_| | (_| | |  | | | |
//   |_____/ \___/ \_/\_/ |_| |_|_|\___/ \__,_|\__,_|_|  |_|_|_|
//                                                              
//   ©2014-2015 filfat Studios AB
//   Licensed under the MIT license

module DownloadMii {
	export class App {
		//Meta
		public Package: string;
		public Name: string;
		public Version: string;
		public Platform: Array<string>;
		public Description: string;
		public Homepage: string;
		public Author: string;
		public Section: string;
		public Bin: Array<{Href: string, Path: string}>;
		
		//Assets
		public Icon: {Href: string, Size: number};
		public Accent: string;
	}
	export class Settings {
		public cache: boolean = true; //TODO
		public sources = [
			'http://www.downloadmii.com/',
		];
		
		//Taken from .dmii
	}
	
	export class Base {
		public Settings: Settings;
		public DownloadFile: Function;
		public ReadFile: Function;
		public WriteFile: Function;
		public Apps: Array<App> = [];
		public Errors: Array<string> = [];
		
		public DownloadApp(app: App) {
			
		}
		public GetApps() {
			var sources = this.Settings.sources;
			for(var n = 0; n < sources.length; n++) {
				
				//TODO: Check if url is correct to avoid crash
				var data = this.DownloadFile('http://' + sources[n] + '/downloadmii.json');
				var apps;
				
				try{
					apps = JSON.parse(data);
				} catch(e) {
					this.Errors.push('Failed to fetch list of packages!');
					continue;
				}
				
				this.Apps['extend'](apps);
			}
		}
		public GetSettings() {
			
			//Read settings.json
			var f = this.ReadFile('settings.json');
			if(typeof f === undefined || f === null || f === ''){
				this.Settings = new Settings();
				this.WriteFile('settings.json', JSON.stringify(this.Settings, null, 2));
			}
			else {
				try {
					this.Settings = <Settings>JSON.parse(f);
				} catch (e) {
					this.Errors.push('settings.json invalid: "' + e.message + '"!');
					throw e.message;
				}
			}
			
			//Read .dmii app
			f = this.ReadFile('.dmii');
			if(typeof f === undefined || f === null || f === ''){
				this.Settings = new Settings();
				this.WriteFile('.dmii', JSON.stringify({
					Package: 'com.filfatstudios.downloadmii',
					Name: 'DownloadMii',
					Version: VERSION,
				}));
			}
			else {
				try {
					this.Settings = <Settings>JSON.parse(f);
				} catch (e) {
					this.Errors.push('.dmii invalid: "' + e.message + '"!');
					throw e.message;
				}
			}
		}
	}
}

//Taken from http://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array
Array.prototype['extend'] = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);    
}