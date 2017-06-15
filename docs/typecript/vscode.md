
## Debugging

In VSCode, left page menu, click on debug icon, the prior to last menu item.
Below is the working sample `.vscode/launch.json`.
Key items:

- cwd: the root directory for the server app. In this case `${workspaceRoot}/server/`. This is
needed so the .env.claroaprende file is correctly picked up.
- program: the application entry file. Needs to be absolute path, regardless of the `cwd`
- outFiles: the files resulting from the transpilation from TS to JS. Notice that the `program`
is set to the TS file not JS, hence we need to specify the location of the actual JS files.
- sourceMaps: set to true.

```
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Program",
                "cwd": "${workspaceRoot}/server/",
                "program": "${workspaceRoot}/server/src/server.ts",
                "outFiles": [
                    "${workspaceRoot}/server/dist/**/*.js"
                ],
                "env": {
                    "ENV_NAME": ".env.claroaprende"
                },
                "sourceMaps": true
            }
        ]
    }
```