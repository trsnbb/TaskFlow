describe('Компонент Diagram', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('має відображати діаграму з нулями для неавтентифікованого користувача', () => {
    cy.visit('/'); 

    cy.get('.diagram_not_auth').should('be.visible'); 
    cy.get('.chart_center_text').should('have.text', '0'); 
  });

  it('має відображати дані для автентифікованого користувача', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'fake-jwt-token');
      win.localStorage.setItem('user', JSON.stringify({
        _id: 'user123',
      }));
    });

    cy.intercept('GET', '/tasks/user123', {
      statusCode: 200,
      body: [
        { status: 'completed' },
        { status: 'completed' },
        { status: 'in-progress' },
        { status: 'new' },
        { status: 'new' },
      ],
    }).as('fetchTasksForUser');

    cy.visit('/'); 

    cy.wait('@fetchTasksForUser');

    cy.get('.chart_center_text').should('have.text', '5'); 

    cy.get('.legend_item').eq(0).should('contain', 'Виконані');
    cy.get('.legend_item').eq(1).should('contain', 'В процесі');
    cy.get('.legend_item').eq(2).should('contain', 'Не виконані');

    cy.get('canvas').should('be.visible');
  });
});
