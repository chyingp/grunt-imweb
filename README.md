# grunt-imweb

> IMWEB Tasks Collection For Daily Workflow.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-imweb --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-imweb');
```

## The "imweb" task

### Overview
In your project's Gruntfile, add a section named `imweb` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  imweb: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options
Not any options supported yet, just wait for a few seconds ~ -_-b

### Usage Examples

#### dev
Just run the following command and enjoy your developing work, all files needed can be located within the `dev` folder.
	
	grunt dev

#### dist
Just run the following command, then your source files will be publish to the `diet` folder.
	
	grunt dist

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
2013.10.24 Initialize the project with some necessary files.