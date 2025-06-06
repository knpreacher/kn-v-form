/**
 * Copies an object by creating a deep copy using JSON.stringify and JSON.parse.
 */
function copyObject<T = any>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

type DeepCloneable = {
  [key: string]: any;
} | Array<any> | Date | Map<any, any> | Set<any> | Function | RegExp | primitive;
type primitive = string | number | boolean | null | undefined;

function isPlainObject(value: any): boolean {
  if (!value || typeof value !== 'object') return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * Determine if an object is empty:
 * for strings: length === 0;
 * for arrays: length === 0;
 * for objects: Object.keys(obj).length === 0;
 * for null/undefined: true;
 * for numbers: Number.isNaN;
 * for functions: false
 * @param value
 * @returns {boolean}
 */
function isEmpty(value: any): boolean {
  if (typeof value === 'string') return value.length === 0
  if (Array.isArray(value)) return value.length === 0
  if (isPlainObject(value)) return Object.keys(value).length === 0
  if (value === null || value === undefined) return true
  if (typeof value === 'number') return Number.isNaN(value)
  if (typeof value === 'function') return false
  return false
}

function deepClone<T extends DeepCloneable>(source: T, hash = new WeakMap()): T {
  if (source === null || typeof source !== 'object') {
    if (typeof source === 'function') {
      return source
    }
    return source
  }

  if (hash.has(source as object)) {
    return hash.get(source as object)
  }

  if (source instanceof Date) {
    return new Date(source.getTime()) as T
  }

  if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags) as T
  }

  if (source instanceof Map) {
    const clonedMap = new Map()
    hash.set(source as object, clonedMap)
    source.forEach((value, key) => {
      clonedMap.set(deepClone(key, hash), deepClone(value, hash))
    })
    return clonedMap as T
  }

  if (source instanceof Set) {
    const clonedSet = new Set()
    hash.set(source as object, clonedSet)
    source.forEach(value => {
      clonedSet.add(deepClone(value, hash))
    })
    return clonedSet as T
  }

  if (Array.isArray(source)) {
    const clonedArr: any[] = []
    hash.set(source, clonedArr)
    source.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash)
    })
    return clonedArr as T
  }

  if (isPlainObject(source)) {
    const cloned: any = {}
    hash.set(source as object, cloned)

    Object.entries(source).forEach(([key, value]) => {
      cloned[key] = deepClone(value, hash)
    })

    return cloned
  }

  return source
}

function deepJoinObjects<Type = unknown>(...objs: Type[]): Type {
  let result = {} as Type
  objs.forEach((obj) => {
    if (!obj || typeof obj !== 'object') return
    // Skip arrays
    if (Array.isArray(obj)) throw new Error('Arrays not supported')
    Object.entries(obj as Record<string, any>).forEach(
      (entry: [string, any]) => {
        const [key, value] = entry
        if (typeof value === 'object' && typeof value !== 'undefined') {
          result =
            (result as Record<string, any>)[key] === undefined
              ? {
                ...result,
                [key]: value
              }
              : {
                ...result,
                [key]: {
                  ...deepJoinObjects(
                    (result as Record<string, any>)[key],
                    value
                  )
                }
              }
        } else {
          result = {
            ...result,
            [key]: value ?? undefined
          }
        }
      }
    )
  })
  return result
}

function styleValue(value?: string | number) {
  if (typeof value === 'number') {
    return `${value}px`
  } else if (typeof value === 'string') {
    return value
  }
  return undefined
}

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeout: any
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

function randString(length: number = 8) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export { deepJoinObjects, copyObject, deepClone, isPlainObject, isEmpty, styleValue, debounce, randString }
