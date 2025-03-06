/*
 * @author: phil.li
 */
import { SpanStatus } from '@webmonitor/common';

export function fromHttpStatus(status: any): string {
  if (status < 200) {
    return SpanStatus.Ok;
  }

  return SpanStatus.Aborted;
}
