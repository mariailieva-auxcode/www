# Models

## Guide
0. Have Visual Studio Code (optional)
1. Install [node.js](https://nodejs.org)
2. Install typescript: open up terminal and run this command `run npm install -g typescript`

You can run the code in two different ways:

#### Run using Visual Studio Code
- Open up the folder of this project with Visual Studio Code.
![Satrt VS](https://github.com/greenatlas/models/blob/master/docs/screenshots/start-vs.png)
- Go to the `Run` tab (the forth one on the left).
![Run Tab](https://github.com/greenatlas/models/blob/master/docs/screenshots/run-tab.png)
- Click on the `Launch Program` button. This compiles all of the .ts files into .js files. The main entry point is intro.ts (The file that actually 'starts' when you press the `Launch Program` button). The output is displayed in the `DEBUG CONSOLE` bellow.
![DEBUG CONSOLE](https://github.com/greenatlas/models/blob/master/docs/screenshots/debug-console.png)
Note: Sometimes VS Code glitches out and doesn't display anything in the console, so it's a good idea to add breakpoints next to `console.log` statements. To do so click in the space to the right of the line you want to add a breakpoint to and a red cicle should appear. If you want to remove it just click on the circle again.
![Insert Breakpoint](https://github.com/greenatlas/models/blob/master/docs/screenshots/insert-breakpoint.png)
Then when you press the `Launch Program` button the execution will stop and wait at the line at which the breakpoint is. Then press the `Continue` button on the top right (the first one, looks like a play button). Then your statement should be displayed in the `DEBUG CONSOLE` bellow.
![Continue Breakpoint](https://github.com/greenatlas/models/blob/master/docs/screenshots/continue-breakpoint.png)

#### Run using terminal
This method always displays the result.
Navigate to the project folder in terminal and run `npm run go`.
