/**
Code by pnig0s
Date 20130214(Shit Valentine's Day)
一個通用的js任意函數鉤子

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

**/

function Hook()
{
	return {
		initEnv:function () {
			Function.prototype.hook = function (realFunc,hookFunc,context,funcName) {
				var _context = null; //函數上下文
				var _funcName = null; //函數名

				_context = context || window;
				_funcName = funcName || getFuncName(this);
				_context[realFunc] = this;

				if(_context[_funcName].prototype && _context[_funcName].prototype.isHooked)
				{
					console.log("Already has been hooked,unhook first");
					return false;
				}

				function getFuncName (fn) {
					// 獲取函數名稱
					var strFunc = fn.toString();
					var _regex = /function\s+(\w+)\s*\(/;
					var patten = strFunc.match(_regex);
					if (patten) {
						return patten[1];
					};
					return '';
				}

				try
				{
					eval('_context[_funcName] = function '+_funcName+'(){\n'+
						'var args = Array.prototype.slice.call(arguments,0);\n'+
						'var obj = this;\n'+
						'hookFunc.apply(obj,args)\n'+
						'return _context[realFunc].apply(obj,args);\n'+
						'};');
					_context[_funcName].prototype.isHooked = true;
					return true;
				}catch (e)
				{
					console.log("Hook failed,check the params.");
					return false;
				}
			}
			Function.prototype.unhook = function (realFunc,funcName,context) {
				var _context = null;
				var _funcName = null;
				_context = context || window;
				_funcName = funcName;
				if (!_context[_funcName].prototype.isHooked)
				{
					console.log("No function is hooked on");
					return false;
				}
				_context[_funcName] = _context[realFunc];
				delete _context[realFunc];
				return true;
			}
		},
		cleanEnv:function () {
			if(Function.prototype.hasOwnProperty("hook"))
			{
				delete Function.prototype.hook;
			}
			if(Function.prototype.hasOwnProperty("unhook"))
			{
				delete Function.prototype.unhook;
			}
			return true;
		}
	};
}