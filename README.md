hook.js
===
A hooks to any Javascript function.

##Notice
```
[bool]hook:params{
	realFunc[String|must]:用于保存原始函数的函数名称,用于unHook;
	hookFunc[Function|must]:替换的hook函数;
	context[Object|opt]:目标函数所在对象,用于hook非window对象下的函数，如String.protype.slice,carInstance1
	methodName[String|opt]:匿名函数需显式传入目标函数名eg:this.Begin = function(){....};
}
[bool]unhook:params{
	realFunc[String|must]:用于保存原始函数的函数名称,用于unHook;
	funcName[String|must]:被Hook的函数名称
	context[Object|opt]:目标函数所在对象,用于hook非window对象下的函数，如String.protype.slice,carInstance1
}
```
##Examples
```
<script src=hook.js></script>
var myHooks = Hooks();
myHooks.initEnv(); //init hooks

//global native function
var myAlert = function(){console.log("Hooked.")};
alert.hook("_alert",myAlert); //true
alert("pnig0s");
//Hooked.
//pnig0s
alert.unhook("_alert","alert"); //true

myHooks.cleanEnv(); //clear hooks
```
