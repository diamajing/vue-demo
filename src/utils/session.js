/**
 * store.js 离线存储
 * @description 操作localStorage的数据
 * @module utils/store
 */

export default (function(){

    let store = window.sessionStorage;

    function get(key) {
        let val = store[key];
        return (val && val !== 'undefined')? JSON.parse(val): null;
    }

    function set(key, val) {
		if (key && val)	store[key] = JSON.stringify(val);
    }

    function clear(key) {
        delete store[key];
    }

    function clearAll(){
		let i = store.length;
		while (i--) {
			let key = store.key(i);
			store.removeItem(key);
		}
    }

    return {
        get,
        set,
        clear,
        clearAll
    };

}());
