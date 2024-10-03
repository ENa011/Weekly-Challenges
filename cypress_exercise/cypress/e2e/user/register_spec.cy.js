describe('/register', () => {
    beforeEach(() => {
        cy.visit('https://conduit.realworld.how/register')
    })

    it('greets with Sign in', () => {
        cy.contains('h1', 'Sign up');
    })
})