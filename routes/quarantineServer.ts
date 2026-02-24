/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'
import * as utils from '../lib/utils'

module.exports = function serveQuarantineFiles () {
  return ({ params, query }: Request, res: Response, next: NextFunction) => {
    const file = params.file
    if (!file) {
      res.status(403)
      next(new Error('File name is required'))
      return
    }
    const safePath = utils.resolvePathUnder('ftp/quarantine', file)
    if (!safePath) {
      res.status(403)
      next(new Error('File names cannot contain path traversal'))
      return
    }
    res.sendFile(safePath)
  }
}
