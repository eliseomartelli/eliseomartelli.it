---
title: Modular applications in go
date: 2022-12-02 21:30
excerpt: Plugins, plugins, plugins.
tags:
  - Programming
  - Short
---

I'm working on an unnamed application (I can't tell much about it now, but I will share more when I can) where I needed a way to load plugins dynamically based on the app's configuration.

I concluded that I needed a way to "store" the plugins and load them based on the application configuration. It seems that the premise is akin to the "registry" pattern.

## The registry

To have an O(1) time complexity, I decided to store plugins in a "map".

```
// Plugin registry.
var Plugins = map[string]Plugin{}
```

But it doesn't automatically solve our problems. Golang offers an init function that gets called only when we first import a package. You can have any number of init functions inside a package (one per file, for example).

So the next idea is to use the init function to register our plugins.

```
// file plugin_name.go
package plugins

type PluginName struct {}

...

func init() {
	Plugins["plugin"] = &PluginName{}
}
```

We already have a functioning proof-of-concept, but we can make it better!

## Let it shine

We will define an interface for our plugins with some methods to manage the plugin life cycle.

```
type Plugin interface {
	Setup()
	Cleanup()
}
```

Then I made a function to register a plugin into the register:

```
// Factory to provide a closure to get the Plugin.
type PluginFactory = func() Plugin

// Register SHOULD BE called by the init() function of a plugin.
// The provider will be added to the Plugin map.
func Register(pluginName string, plugin PluginFactory) {
	if _, present := Plugins[pluginName]; present {
		log.Fatalf("Plugin %s already defined.", pluginName)
	}
	Plugins[pluginName] = plugin
}
```

We have to change our previous plugin to use this function:

```
// file plugin_name.go

func init() {
	Register("plugin", func() Provider { return &PluginName{} })

}
```

## Consuming the plugin

To use the plugins, we can, for example, iterate on a list of configured plugins, check if they're available in the map, and call the life cycle method to set them up.

```
for _, pluginName := range configuredPlugins {
	if plugin, present := Plugins[pluginName]; present {
		plugin.Setup()
	}
}
```

We now have the tools to build a modular application in go.
