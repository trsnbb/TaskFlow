describe('Компонент Achievement', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('має відображати нулі для неавтентифікованого користувача', () => {
    cy.visit('/');  

    cy.get('.count_achievement', { timeout: 10000 }).should('have.length', 4);  
    cy.get('.count_achievement').eq(0).should('have.text', '0');
    cy.get('.count_achievement').eq(1).should('have.text', '0');
    cy.get('.count_achievement').eq(2).should('have.text', '0');
    cy.get('.count_achievement').eq(3).should('have.text', '0');
  });

  it('має відображати дані для автентифікованого користувача', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'fake-jwt-token');
      win.localStorage.setItem('user', JSON.stringify({
        completedTaskCount: 5,
        completedProjectsCount: 3,
        involvedProjectsCount: 7,
        createdOrAdminProjectsCount: 2,
      }));
    });

    cy.visit('/');  

    cy.get('.count_achievement', { timeout: 10000 }).should('have.length', 4);  
    cy.get('.count_achievement').eq(0).should('have.text', '5');  
    cy.get('.count_achievement').eq(1).should('have.text', '3');  
    cy.get('.count_achievement').eq(2).should('have.text', '7');  
    cy.get('.count_achievement').eq(3).should('have.text', '2');  
  });
});
