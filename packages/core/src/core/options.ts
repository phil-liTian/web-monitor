/*
 * @author: phil.li
 */
import type { InitOptions } from '@webmonitor/types';
import { transportData } from './reportData';

export function handleOptions(options: InitOptions) {
  transportData.bindOptions(options);
}
