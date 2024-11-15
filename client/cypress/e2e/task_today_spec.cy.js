describe('Компонент TaskToday на головній сторінці', () => {
  
  const user = {
    emailOrUserName: 'koshenya',
    password: '123456',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('має показувати модалку, коли користувач не авторизований і натискає "Авторизуватись"', () => {
    cy.visit('/');  

    cy.get('.text_auth .link_modal_auth').first().click();  

    cy.get('.modal-overlay').should('be.visible');
    cy.get('.login-form').should('be.visible');
  });

  it('має авторизувати користувача та завантажити задачі без модалки', () => {
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      _id: 'user-id',
      username: 'koshenya',
    }));

    cy.visit('/');  

    cy.get('.modal-overlay').should('not.exist');
    
    cy.intercept('GET', '/tasks/*', {
      statusCode: 200,
      body: [
        { _id: 'task1', name: 'Task 1', status: 'new' },
        { _id: 'task2', name: 'Task 2', status: 'in-progress' },
      ],
    }).as('getTasks');

    cy.wait('@getTasks');
    cy.get('.task_item').should('have.length', 2);
  });

  it('має фільтрувати задачі правильно після авторизації', () => {
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      _id: 'user-id',
      username: 'koshenya',
    }));

    cy.intercept('GET', '/tasks/*', {
      statusCode: 200,
      body: [
        { _id: 'task1', name: 'Task 1', status: 'new' },
        { _id: 'task2', name: 'Task 2', status: 'in-progress' },
        { _id: 'task3', name: 'Task 3', status: 'completed' },
      ],
    }).as('getTasks');

    cy.visit('/');  

    cy.wait('@getTasks');
    cy.get('.task_item').should('have.length', 3);

    cy.get('.filter_item').contains('В процесі').click();

    cy.get('.task_item').should('have.length', 1);
    cy.get('.task_item').contains('Task 2');
  });

});
