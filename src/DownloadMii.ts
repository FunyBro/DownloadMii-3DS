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
		
		//Assets
		public Icon: {Href: string, Size: number};
		public Accent: string;
	}
	export class Settings {
		public repo = [
			{
				name: 'DownloadMii',
				url: 'http://www.downloadmii.com',
			},
		];
	}
	
	export class Base {
		public Settings: Settings;
		public DownloadFile: Function;
		public ReadFile: Function;
		public WriteFile: Function;
		
		public DownloadApp(app: App) {
			
		}
		public GetSettings() {
			var f = this.ReadFile('settings.json');
			if(typeof f === undefined || f === null){
				this.Settings = new Settings();
				this.WriteFile('settings.json', JSON.stringify(this.Settings));
			}
			else {
				this.Settings = <Settings>JSON.parse(f);
			}
		}
	}
}