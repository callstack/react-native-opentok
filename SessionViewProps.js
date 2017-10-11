/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default {
  /**
   * OpenTok token to use when publishing
   */
  token: PropTypes.string.isRequired,
  /**
   * OpenTok sessionId to use when publishing
   */
  sessionId: PropTypes.string.isRequired,
  /**
   * OpenTok API Key to be used
   */
  apiKey: PropTypes.string.isRequired,
};
