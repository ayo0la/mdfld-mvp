describe('Example Flow', () => {
  it('visits the homepage and checks for welcome text', () => {
    cy.visit('/');
    cy.contains('Welcome to mdfld-mvp!').should('be.visible');
  });
}); 