describe('Login Page', function() {
  it('login with enrolled id and password', function() {
    cy.visit('https://www.find-me.website');
    cy.get('input[name=id]').type('ss');
    cy.get('input[name=password]').type('gogo1234{enter}');
    cy.contains('시작하기').click();
  });
  it('login with enrolled id and password', function() {
    cy.visit('https://www.find-me.website');
    cy.get('input[name=id]').type('ss');
    cy.get('input[name=password]').type('gogo1234{enter}');
    cy.contains('시작하기').click();
  });
});
