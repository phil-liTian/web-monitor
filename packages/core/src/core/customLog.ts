/*
 * @author: phil.li
 */
import ErrorStackParser from "error-stack-parser";
import { EVENTTYPES, STATUSCODE } from "@webmonitor/common";
import { getTimestamp, isError, unknownToString } from "@webmonitor/utils";
import { breadcrumb } from "./breadCrumb";
import { transportData } from "./reportData";

export function log({
  message = 'customMsg',
  error,
  type = EVENTTYPES.CUSTOM,
}: {
  error: any;
  message: string;
  type: EVENTTYPES;
}): void {
  try {
    let errorInfo = {};
    if (isError(error)) {
      const result = ErrorStackParser.parse(!error.target ? error : error.error || error.reason)[0];
      errorInfo = {
        ...result,
        line: result.lineNumber,
        column: result.columnNumber,
      }
    }
    
    breadcrumb.push({
      type,
      status: STATUSCODE.ERROR,
      category: breadcrumb.getCategory(type),
      time: getTimestamp(),
      data: unknownToString(message)
    })

    transportData.send({
      type,
      status: STATUSCODE.ERROR,
      message: unknownToString(message),
      time: getTimestamp(),
      ...errorInfo
    })

  } catch (error) {
    console.log(error);
  }
}