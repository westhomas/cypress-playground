describe("origin checking", function () {

    it("works", function () {

        // check the server logs: the browser •should• send an origin, but it's not
        cy.visit("http://localhost:3000")

        cy.get("button").click()

    })

})
