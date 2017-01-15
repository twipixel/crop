(function(global){

	/**
	 * "a.b.c"의 namespace를 가지고 { a:{ b:{ c:{} } } }; 
	 * 객체를 생성하는 함수
	 * @param  {[Object]} scope 
	 * @param  {[Array]} names 
	 * @return {[Object]}       
	 */
	function _usenamespace( scope, names ){

		if( names.length <= 0 ) return scope;

		var name = names.shift();

		if( typeof scope[name] === "undefined" )
			scope[name] = {};

		return _usenamespace( scope[name], names );
	}

	if( typeof global.usenamespace === "undefined" ){

		global.usenamespace = function( namespace ){

			global.nts = global.nts || {};

			return _usenamespace( global.nts, namespace.split(".") );
		}
	}


	/**
	 * usenamespace를 이용 common namespace 생성. 
	 * common에 상속 함수 구현. 
	 * @type {[void]}
	 */
	var common = usenamespace( "common" );

	if( typeof common.extends === "undefined" ){

		common.extends = function( SuperClass, ChildClass ){

			ChildClass.prototype = Object.create( SuperClass.prototype );
			ChildClass.prototype.constructor = ChildClass;

			return ChildClass.prototype;
		}
	}

	/**
	 * IE10에서는 ImageData의 data 값이 CanvasPixelArray로 반환되어
	 * ArrayBuffer.set 함수가 없습니다. 
	 * ArrayBuffer.set의 polyfill 
	 * @param  {[type]} window.CanvasPixelArray [description]
	 * @return {[type]}                         [description]
	 */
	if(window.CanvasPixelArray) {

    	CanvasPixelArray.prototype.set = function(arr) {

	        var l=this.length, i=0;

	        for(;i<l;i++) {
	            this[i] = arr[i];
	        }
    	};
	}

})(this);