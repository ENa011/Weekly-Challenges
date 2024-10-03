describe('/profile', () => {
    beforeEach(() => {
        cy.visit('https://conduit.realworld.how/login')
    });

   it('navigate to the profile page', () => {
    cy.get(':nth-child(2) > .form-control').type('user_unique_1@email.com');
    cy.get(':nth-child(3) > .form-control').type('valid{enter}');
    cy.get(':nth-child(4) > .nav-link').click();
    cy.hash().should('eq', 'user_unique_1');
   }) 


})