'use strict'

const chai = require('chai'),
      expect = require('chai').expect,
      getSubscriptionList = require('./api/getSubscriptionList');

describe("[GET] /subscriptions", () => {
  it("returns a subscription list", done => {
    getSubscriptionList()
      .end((error, response) => {
        const expectedSchema = {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "_id": { "type": "string" },
              "name": { "type": "string" },
              "price": { "type": "number" },
              "config": {
                "type": "object",
                "properties": {
                  "maxEvaluators": { "type": "number" },
                  "maxEvaluatees": { "type": "number" }
                },
                "required": ["maxEvaluators", "maxEvaluatees"]
              }
            },
            "required": ["_id", "name", "price"]
          }
        };

        expect(response).to.have.status(200);
        expect(response.body).to.be.jsonSchema(expectedSchema);
        done();
      });
  });
})
