# Build Automation Tools

### `npm run start`

Launches a development web server

#### Options

| Flag       | Type   | Defaults  | Description                                 |
| ---------- | ------ | --------- | ------------------------------------------- |
| `--host`   | string | localhost | Listen host                                 |
| `--port`   | number | 3000      | Listen port                                 |
| `--env`    | string | `''`      | Set the `process.env.BUILD_ENV` environment |
| `--no-dev` | bool   | false     | Disable `development` mode                  |
| `--no-hmr` | bool   | false     | Disable `Hot Module Replacement` mode       |

### `npm run build`

Compiles the project from source files into a distributable format and copies it to the output (build) folder.

#### Options

| Flag    | Type   | Defaults | Description                                 |
| ------- | ------ | -------- | ------------------------------------------- |
| `--env` | string | `''`     | Set the `process.env.BUILD_ENV` environment |

### `npm run clean`

Cleans up the output (build) directory

### `npm run analyze`

Represents bundle content as convenient interactive zoomable treemap.
