/*
 * @author: phil.li
 */

export interface VueInstance {
  [key: string]: any
}

export interface VueConfiguration {
  slient?: boolean,
  errorHandler: (err: Error, vm: ViewModel, info: string) => void
}

export interface ViewModel {
  [key: string]: any
}