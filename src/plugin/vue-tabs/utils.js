export function isFunction (fn) {
    if (!fn) {
        return false
    }
    return typeof fn === 'function'
}

export function isString (str) {
    if (!str) {
        return false
    }
    return typeof str === 'string'
}

export function isObject (obj) {
    if (!obj) {
        return false
    }
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const store = {
    save (key, value) {
        if (!key || !value) {
            return
        }
        window.sessionStorage[key] = JSON.stringify(value)
    },
    get (key) {
        let value = window.sessionStorage[key]
        if (!value) {
            return null
        }
        return JSON.parse(value)
    }
}

export const consts = {
    STORE_KEY: '$TABS',
	  CURRENT_KEY: '$CURRENT_TAB',
	  PIN_KEY: '$PIN_TABS'
}
