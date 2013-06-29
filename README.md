# Initializer

This [mankees](https://github.com/mankees/cli) plugin provides initializes a project. It injects `.mankees/config.json` data to templates defined in a directory structure placed below this plugin. See `node/` directory for a demo of such. It expects `config.json` such as follow to work fully:

```json
{
  "author": "John Doe",
  "nick": "johnno",
  "email": "john@doe.com",
  "year": 2013,
  "license": "MIT"
}
```
