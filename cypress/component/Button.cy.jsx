import React from "react";
import Button, { BUTTON_TYPES, BUTTON_SIZES } from "../../src/components/Button";

describe("<Button />", () => {
  it("renders button with provided label", () => {
    cy.mount(
      <Button
        label="Add to cart"
        onClick={() => {}}
      />
    );

    cy.contains("Add to cart")
      .should("be.visible");
  });


  it("calls onClick when button is clicked", () => {
    const onClickSpy = cy.spy().as("onClick");

    cy.mount(
      <Button
        label="Click me"
        onClick={onClickSpy}
      />
    );

    cy.contains("Click me")
      .click();

    cy.get("@onClick")
      .should("have.been.calledOnce");
  });


  it("renders correct button size class", () => {
    cy.mount(
      <Button
        label="Large button"
        size={BUTTON_SIZES.LARGE}
        onClick={() => {}}
      />
    );

    cy.get("button")
      .should("have.class", "btn_large");
  });


  it("renders back image for back button type", () => {
    cy.mount(
      <Button
        label="Back"
        type={BUTTON_TYPES.BACK}
        onClick={() => {}}
      />
    );

    cy.get("img")
      .should("have.attr", "alt", "Go back");
  });
});