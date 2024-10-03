describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://google.com')

    cy.get('#APjFqb', {timeout: 5000}).type("automation testing guide{enter}");
   // cy.contains('Google Search').click();
  })
})