/// <reference types="cypress" />
context("TODO MVC Application V2 Tests", () => {
  // Helper function for adding todos
  const addTodo = (todoText) => {
    cy.get("input[name='todo']").type(`${todoText} {Enter}`);
  };

  beforeEach(() => {
    cy.visit("/todos");
  });

  describe("Todo app tests", function () {
    it("go to todos page", () => {
      cy.visit("/todos"); // Assuming you want to visit the todos page
      cy.url().should("include", "/todos");
    });

    it("find input", () => {
      cy.get("input[name='todo']").should("be.visible");
    });

    it("can add a todo", () => {
      addTodo("New Todo");
      cy.wait(10000);
      addTodo("Another New Todo");
      cy.wait(10000);
      cy.get(".todos").children().should("have.length", 2);
    });

    it("can mark a todo as completed", () => {
      cy.get(".todos").children().eq(0).find(".toggle").click();
      cy.wait(10000);
      cy.get(".todos").children().eq(1).find(".toggle").click();
      cy.wait(10000);
    });

    it("can view active todos", () => {
      addTodo("3rd New Todo");
      cy.wait(10000);
      cy.get(".todo-status > button:nth-child(2)").click();
      cy.wait(10000);
      cy.get(".todos").children().should("have.length", 1);
    });

    it("can view completed todos", () => {
      cy.get(".todo-status > button:nth-child(3)").click();
      cy.wait(10000);
      cy.get(".todos").children().should("have.length", 2);
    });

    it("can delete a todo", () => {
      cy.get(".todos")
        .children()
        .eq(0)
        .find(".todo-delete")
        .click({ force: true });
      cy.get(".todos").children().should("have.length", 2);
    });

    it("can delete all todos", () => {
      cy.request("GET", "/api/todos").its("status").should("equal", 200);
      cy.wait(1000);
      cy.get(".todo-actions > button").click();
      cy.wait(10000);
      cy.get(".todos").children().should("have.length", 0);
    });
  });
});
