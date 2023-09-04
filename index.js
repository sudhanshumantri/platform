var express = require('express');
var path = require('path');
var logger = require('morgan');
const _ = require('lodash');
const ExpressLoader = require("./loaders/index");
new ExpressLoader();
