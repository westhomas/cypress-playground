import { settings } from "../../package.json"

describe("origin checking", function () {

    it("works", function () {

        // check the server logs: the browser •should• send an origin, but it's not
        cy.visit(settings.allowedOrigin)

        cy.get("button").click()

    })

})
