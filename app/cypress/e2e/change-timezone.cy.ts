describe("On a page hosting an event card, user changes the timezone, and the event's start & end date change to reflect the new time.", () => {
  it('navigates to an event details page', () => {
    cy.visit('/en/events/0');
  });

  it('should have the event details page loaded', () => {
    cy.get('h1').should('contain', 'DAOs For Humanity');
  });

  it('selects timezone UTC (GMT-0:00) & event times should adjust.', () => {
    cy.get('[id=timezone-selector]').select('UTC');
    const dateLabelSelector = '[data-cy=datelabel]';
    cy.get(dateLabelSelector).should(
      'have.text',
      '27/09/2022 02:0027/09/2022 05:00'
    );
  });

  it('selects timezone: America/Ensenada (GMT-8:00) & times should adjust to the new timezone', () => {
    cy.get('[id=timezone-selector]').select('America/Ensenada');
    const dateLabelSelector = '[data-cy=datelabel]';
    cy.get(dateLabelSelector).should(
      'have.text',
      '26/09/2022 18:0026/09/2022 21:00'
    );
  });

  // it('checks that a cookie "timezone" has been created', () => {
  //   cy.getCookie('timezone').should('exist');
  // });
});

// Prevent TypeScript from reading file as legacy script
export {};
