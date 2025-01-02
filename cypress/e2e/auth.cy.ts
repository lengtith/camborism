type User = {
  email: string;
  password: string;
};

describe("fixtures demo", function () {
  let user: User;
  beforeEach("get data", function () {
    cy.fixture("user").then((data) => (user = data));
  });

  it("sign in form fill-in", function () {
    cy.visit("/signin");
    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password']").type(`${user.password}`);
    cy.get("button[type='submit']").click();
    cy.wait(10000);
    cy.visit(".");
    cy.get("[data-testid='profile']").should("exist");
    cy.get(".profile").should("be.visible").click();
    cy.wait(10000);
    cy.get(".btn-signout").should("be.visible").as("logout");
    cy.wait("@logout").click();
  });

  it.skip("test new destination", function () {
    cy.visit("/destinations/create");
    cy.getLocalStorage(null);
  });
});
