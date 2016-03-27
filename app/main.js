/**
 * Created by hammer on 2016/3/26.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import PaySelect from './components/PaySelect';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
ReactDOM.render(<HelloWord/>,
    document.getElementById('app'))