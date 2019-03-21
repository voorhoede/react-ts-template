
describe('My First Test', function() {
    it('Visits TP Vision webapp homepage', function() {
      cy.visit('/')
      cy.get('h1').contains('Welcome!');
    })
})
