hook.js
===
A hooks to any Javascript function.

##Notice
```
[bool]hook:params{
  realFunc[String|must]:用於保存原始的目標函數名,用於unHook;
	hookFunc[Function|must]:替換的hook函數;
	context[Object|opt]:目標函數實例的對象,用於hook非window對象下的函數，如String.protype.slice,carInstance1
	methodName[String|opt]:用於hook匿名函數eg:this.Begin = function(){....};
}
[bool]unhook:params{
	realFunc[String|must]:用於保存原始的目標函數名,用於unHook;
	funcName[String|must]:被Hook的函數名稱
	context[Object|opt]:目標函數實例的對象,用於hook非window對象下的函數，如String.protype.slice,carInstance1
}
```
##Examples
```
<script src=hook.js></script>
var myHooks = Hooks();
myHooks.initEnv(); //init hooks

//普通全局带参数函数
var myAlert = function(){console.log("Hooked.")};
alert.hook("_alert",myAlert); //true
alert("pnig0s");
//Hooked.
//pnig0s
alert.unhook("_alert","alert"); //true
```
