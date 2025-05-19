import type { Ref } from 'vue'
import { isEmpty } from '@/utils/jsUtils.ts'

export type TranslateFn = (value: string, scope?: { [key: string]: any }) => string

export const fakeTranslate: TranslateFn = (value, scope?) => `${value} [${JSON.stringify(scope)}]`

export interface RulesOptions {
  $t?: TranslateFn
}

export const REGEX = Object.freeze({
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD: /[^A-Za-z\d]+/,
  SLUG: /(^[A-Za-z]$)|(^[A-Za-z][A-Za-z\d_]+$)/,
  PASSWORD_NEW: /^[A-Za-z\d]+$/,
  SPECIAL: /\W|_/g,
  FLOAT: /\d+(?:\.\d*)?$/,
  FLOAT_OR_EMPTY: /^(\s*|-?\d+(?:\.\d*)?)$/,
  INT: /^\d+$/,
  INT_OR_EMPTY: /^(\s*|\d+)$/,
  NUMBERS_WITH_SPECIALS: /^[0-9*#.\-_+]+$/,
  ENG_NUMBERS_SPECIALS: /^[A-Za-z\d*#.\-_+]+$/,
  ENG_NUMBERS_SPECIALS_SPACE: /^[A-Za-z\d*#.\- _+]+$/
})

const createDefaultOptions: () => Required<RulesOptions> = () => ({$t: fakeTranslate})

export const RULES = (_options?: RulesOptions) => {
  const {$t}: Required<RulesOptions> = {...createDefaultOptions(), ..._options}
  return Object.freeze({
    required: () => (value: any) => !isEmpty(value) || $t('$knRules.required'),

    email: () => (value: any) => isEmpty(value) || REGEX.EMAIL.test(value) || $t('$knRules.email'),
    notEmptyString: () => (value: any) => value && typeof value === 'string' || $t('$knRules.notEmptyString'),

    engNumOnly: () => (value: any) => isEmpty(value) || REGEX.PASSWORD_NEW.test(value) || $t('$knRules.engNumOnly'),
    engNumSpecialOnly: () => (value: any) => isEmpty(value) || REGEX.ENG_NUMBERS_SPECIALS.test(value) || $t('$knRules.engNumSpecialOnly'),
    engNumSpecialSpaceOnly: () => (value: any) => isEmpty(value) || REGEX.ENG_NUMBERS_SPECIALS_SPACE.test(value) || $t('$knRules.engNumSpecialSpaceOnly'),
    numSpecialOnly: () => (value: any) => isEmpty(value) || REGEX.NUMBERS_WITH_SPECIALS.test(value) || $t('$knRules.numSpecialOnly'),

    notEqualsTo: (inp: any) => (value: any) => value !== inp || $t('$knRules.notEqualsTo', {v: inp}),
    passwordEquals: (inp: any) => (value: any) => value === inp || $t('$knRules.passwordsNotEquals'),
    passwordEqualsRef: (inp: Ref<any>) => (value: any) => value === inp.value || $t('$knRules.passwordsNotEquals'),

    counterMax: (count: number) => (value: any) => isEmpty(value) || value?.length < count || $t('$knRules.counterMax', {n: count}),
    counterMin: (count: number) => (value: any) => isEmpty(value) || value?.length > count || $t('$knRules.counterMin', {n: count}),
    counterEqual: (count: number) => (value: any) => isEmpty(value) || value?.length === count || $t('$knRules.counterEqual', {n: count}),
    counterMaxEqual: (count: number) => (value: any) => isEmpty(value) || value?.length <= count || $t('$knRules.counterMaxEqual', {n: count}),
    counterMinEqual: (count: number) => (value: any) => isEmpty(value) || value?.length >= count || $t('$knRules.counterMinEqual', {n: count}),

    lenMaxEqual: (count: number) => (value: any) => value?.length <= count || $t('$knRules.lenMaxEqual', {n: count}),
    lenMinEqual: (count: number) => (value: any) => value?.length >= count || $t('$knRules.lenMinEqual', {n: count}),

    numMaxEqual: (num: number) => (value: any) => !value || value <= num || $t('$knRules.numMaxEqual', {num: num}),
    numMinEqual: (num: number) => (value: any) => !value || value >= num || $t('$knRules.numMinEqual', {num: num}),

    int: () => (value: any) => isEmpty(value) || REGEX.INT.test(value) || $t('$knRules.int'),
    float: () => (value: any) => isEmpty(value) || REGEX.FLOAT.test(value) || $t('$knRules.float'),
    checked: () => (value: any) => value === true || $t('$knRules.checked'),
    slug: () => (value: any) => isEmpty(value) || REGEX.SLUG.test(value) || $t('$knRules.engNumOnly')

  })
}
