import { toast } from "react-toastify";
import classNames from "classnames";

export function notify(text, type, options) {
  toast(text, {
    progressClassName: classNames({
      'progress--success': type === 'success',
      'progress--failed': type === 'failed'
    }),
    ...options
  })
}
