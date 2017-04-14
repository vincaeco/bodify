require('../src/bootload')

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiHttp)
chai.use(chaiJsonSchema)
