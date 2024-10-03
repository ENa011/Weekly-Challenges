import {LoginPage} from "../pages/login_page"

const loginPage = new LoginPage();

describe('/login', () =>{
    beforeEach(() => {
        cy.visit('https://conduit.realworld.how/login');
    });

    it("greets with Sign in", () => {
        cy.contains('h1', 'Sign in');
    });

    it('links to /register', () => {
        cy
        .contains("Need an account?")
        .should('have.attr', 'href', '/register');
    });
    
    it('Prevent from clicking if there is no ID or password', () => {
        cy.get('form').contains('Sign in').should('be.disabled');
        cy.get(':nth-child(2) > .form-control').type('user1');
        cy.get(':nth-child(3) > .form-control').type('pass1');
        cy.get('form').contains('Sign in').should('not.be.disabled');
    });

    it('require valid user email and password', () => {
        loginPage.submitEmail('user_unique_1@email.gom');
        loginPage.submitPassword('invalid');
        loginPage.clickSubmit();
        cy.get('.error-messages > li').should('contain', 'email or password is invalid');
    });

    it('navigate to homepage upon successful login', () => {
        
        cy.fixture('users').then((users) => {
        loginPage.submitEmail(users.email);
        loginPage.submitPassword(users.password);
        loginPage.clickSubmit();
        cy.hash().should('eq', '');
        })

    });
})