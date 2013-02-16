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
var myHook = new Hooks();
myHook.initEnv();

//普通全局函数
var _alert = null;
function myalert(param){console.log("before hook");}
alert.hook("_alert",myalert);
alert.unhook("_alert","alert");
alert(1);

//自定义对象匿名函数
function Person() {
this.getName = function(name) {
alert('Call' + name);
}
} 
var p = new Person();
var _p_getName = null;
function mygetName(name){alert("Hooked");}
p.getName.hook("_p_getName",mygetName,p,"getName");
p.getName.unhook("_p_getName","getName",p);
p.getName("pnig0s");

//原型对象函数
var _slice = null;
function myslice(param){alert("Hooked");}
String.prototype.slice.hook("_slice",myslice,String.prototype);
String.prototype.slice.unhook("_slice","slice",String.prototype);
var str = "pnig0s";
str.slice(1);

myHooks.cleanEnv(); //clear hooks
```
