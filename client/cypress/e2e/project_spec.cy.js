describe('Компонент AllProject', () => {
  const user = {
    emailOrUserName: 'koshenya',
    password: '123456',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('має завантажити список проектів після авторизації та відобразити їх', () => {
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      _id: 'user-id',
      username: 'koshenya',
    }));

    cy.intercept('GET', '/project?userId=user-id', {
      statusCode: 200,
      body: [
        { id: 'project1', name: 'Project 1', projectManager: { fullName: 'Manager 1' }, deadline: '2024-12-01', createdAt: '2024-11-01' },
        { id: 'project2', name: 'Project 2', projectManager: { fullName: 'Manager 2' }, deadline: '2024-11-15', createdAt: '2024-10-01' },
      ],
    }).as('getProjects');

    cy.visit('/');  

    cy.wait('@getProjects');
    cy.get('.name_project p').should('have.length', 3);  
    cy.get('.name_project p').eq(1).should('have.text', 'Project 1');
    cy.get('.name_project p').eq(2).should('have.text', 'Project 2');
  });

  it('має коректно відображати статус проектів та прогрес', () => {
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify({
      _id: 'user-id',
      username: 'koshenya',
    }));

    cy.intercept('GET', '/project?userId=user-id', {
      statusCode: 200,
      body: [
        { id: 'project1', name: 'Project 1', projectManager: { fullName: 'Manager 1' }, deadline: '2024-12-01', createdAt: '2024-11-01', status: 'in-progress' },
        { id: 'project2', name: 'Project 2', projectManager: { fullName: 'Manager 2' }, deadline: '2024-11-15', createdAt: '2024-10-01', status: 'finished' },
      ],
    }).as('getProjects');

    cy.visit('/');  

    cy.wait('@getProjects');

    cy.get('.status_project .item_status').should('have.length', 2);  
    cy.get('.status_project .item_status').eq(0).should('have.class', 'status_task_in_progress');
    cy.get('.status_project .item_status').eq(1).should('have.class', 'status_task_finish');
  });
});
