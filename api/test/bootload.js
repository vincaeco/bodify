'use strict'
require('../src/bootload')

const chai = require('chai'),
      chaiHttp = require('chai-http'),
      chaiJsonSchema = require('chai-json-schema')
global.API_URL = 'http://localhost:3000'

chai.use(chaiHttp)
chai.use(chaiJsonSchema)
