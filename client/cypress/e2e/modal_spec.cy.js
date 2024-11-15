describe("Модальне вікно авторизації", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit("/"); 
  });

  it("має відкриватися при натисканні на кнопку авторизації", () => {
    cy.get(".modal-overlay").should("not.exist");
    cy.get(".header_wrapper_left").contains("Авторизація").click();
    cy.get(".modal-overlay").should("exist");
    cy.get(".modal-content").should("exist");
  });

  it("має закриватися при натисканні на кнопку закриття", () => {
    cy.get(".header_wrapper_left").contains("Авторизація").click();
    cy.get(".close-btn").click();
    cy.get(".modal-overlay").should("not.exist");
  });

  it("має переключатися між формою входу та реєстрації", () => {
    cy.get(".header_wrapper_left").contains("Авторизація").click();
    cy.get(".login-form").should("exist");
    cy.get(".register-form").should("not.exist");
    cy.get("a").contains("Зареєструйтеся").click();
    cy.get(".register-form").should("exist");
    cy.get(".login-form").should("not.exist");
    cy.get("a").contains("Увійдіть").click();
    cy.get(".login-form").should("exist");
    cy.get(".register-form").should("not.exist");
  });

  it("має показувати помилку, якщо форма входу не заповнена", () => {
    cy.get(".header_wrapper_left").contains("Авторизація").click();
    cy.get("form").submit();
    cy.get(".error_message")
      .should("exist")
      .and("have.text", "Будь ласка, заповніть всі поля для входу");
  });

  it("має дозволяти реєстрацію з правильними даними", () => {
    cy.get(".header_wrapper_left").contains("Авторизація").click();
    cy.get("a").contains("Зареєструйтеся").click();
    cy.get('input[name="fullName"]').type("Тестове Ім'я");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="userName"]').type("testuser");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.intercept("POST", "/register").as("registerRequest");
    cy.get("form").submit();
    cy.wait("@registerRequest").its("response.statusCode").should("eq", 200);
    cy.get(".modal-overlay").should("not.exist");
    cy.get(".account_title").should("exist").and("contain", "Тестове Ім'я");
  });

  it("не дозволяє реєстрацію, якщо паролі не співпадають", () => {
    cy.get(".header_wrapper_left").contains("Авторизація").click();
    cy.get("a").contains("Зареєструйтеся").click();
    cy.get('input[name="fullName"]').type("Тестове Ім'я");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="userName"]').type("testuser");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password321");
    cy.get("form").submit();
    cy.get(".register-form").should("exist");
    cy.get(".modal-overlay").should("exist");
    cy.get('input[name="fullName"]').should("have.value", "Тестове Ім'я");
    cy.get('input[name="email"]').should("have.value", "test@example.com");
    cy.get('input[name="userName"]').should("have.value", "testuser");
  });
});
