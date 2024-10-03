describe('/setting', () => {
    beforeEach(() =>{
        cy.login('user_unique_1@email.com', 'valid');
        cy.contains('Settings').click();
    });

    it('greets with Settings', () => {
        cy.get('.text-xs-center').should('contain', "Your Settings");
    })

})