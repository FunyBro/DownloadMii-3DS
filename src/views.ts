module views {
	export function Main(runtime: DownloadMii.Base) {
		var position = 0;
		var items = [
			{
				title: 'View Apps',
				render: function(runtime: DownloadMii.Base) {
					
				},
			},
			{
				title: 'Settings',
				render: function(runtime: DownloadMii.Base) {
					
				},
			},
			{
				title: 'Exit',
				render: function(runtime: DownloadMii.Base) {
					System.exit();
				},
			},
		];
		
		var Rendered = false;
		while(1){
			var input = Input.getInput();
			if(!input.KEY && Rendered)
				continue;
			else if(input.KEY_A) {
				items[position].render(runtime);
			} else if(input.KEY_DOWN) {
				position = (position + 1) <= (items.length - 1) ? (position + 1) : 0;
			} else if(input.KEY_UP) {
				position = (position - 1) >= 0 ? (position - 1) : (items.length - 1);
			}
			
			Console['clear']();
			Console['print']("\n\n  DownloadMii vXXXX\n\n\n\n");
			for(var x = 0; x < items.length; x++){
				var item = items[x];
				Console['print']((position == x ? " >" : "  ") + item.title + "\n");
			}
			Console['flushBuffers']();
			Rendered = true;
		}
	}
	
	export function App(runtime: DownloadMii.Base, app: DownloadMii.App) {
		while(1) {
			var input = Input.getInputUp();
			if(input.KEY_B)
				break;
			else if(input.KEY_A) {
				Console['clear']();
				Console['print']("\n\n  " + app.name + " v" + app.version + "\n\n\n\n");
				Console['print']("  Downloading...\n");
				Console['flushBuffers']();
				runtime.DownloadApp(app);
				App(runtime, app);
				break;
			}
			
			Console['clear']();
			Console['print']("\n\n  " + app.name + " v" + app.version + "\n\n\n\n");
			Console['print']("  A: Download\n");
			Console['print']("  B: Go back\n");
			Console['flushBuffers']();
		}
	}
}