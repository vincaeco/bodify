'use strict';

require('./bootload');
var express = require('express');
var app = express();

app.get('/subscriptions', require('./subscription/action/list'));

app.listen(3000);
