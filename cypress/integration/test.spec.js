describe("pipe stuff", function () {

    const doTestpage = () => {
        cy.visit("https://google.com")


        cy.window().then((win) => {
            setTimeout(() => {
                win.document.write("<div id='hi'>I'm here!</div>")
            }, 6000)
        })

    }

    it("should find the div", function () {

        doTestpage()

        const getDiv = win => win.document.getElementById("hi")

        cy
        .window()
        .pipe(getDiv, { timeout: 7000 })
        .should("have.text", "I'm here!")

    })

    it("should timeout too soon", function () {

        doTestpage()


        const getDiv = win => win.document.getElementById("hi")

        cy
        .window()
        .pipe(getDiv)
        .should("have.text", "I'm here!")


    })

})