/// <reference types="cypress" />
context("app testing", function () {
  it("go to page", () => {
    cy.visit(".");
    cy.get("h5").should("contain", "Welcome to cambodia");
  });
});
