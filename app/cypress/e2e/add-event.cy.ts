describe('user select a timezone & creates an event & is directed to this event details page', () => {
  it('visits the home page [en]', () => {
    cy.visit('/en/events/add');
  });

  it('selects timezone: America/Ensenada (GMT-08:00)', () => {
    cy.get('[id=timezone-selector]').select('America/Ensenada');
  });

  it('checks that a cookie "timezone" has been created', () => {
    cy.getCookie('timezone').should('exist');
  });

  it('types a name for the event', () => {
    cy.get('[id=name]')
      .type('Cypress event')
      .should('have.value', 'Cypress event');
  });

  it('types a description for the event', () => {
    cy.get('[id=description]')
      .type('Cypress description of the event')
      .should('have.value', 'Cypress description of the event');
  });

  it('types a image url for the event', () => {
    cy.get('[id=image]')
      .type('eventD.webp')
      .should('have.value', 'eventD.webp');
  });

  it('selects a start date', () => {
    cy.get('[id=startAt]')
      .type('2023-01-01T10:00')
      .should('have.value', '2023-01-01T10:00');
  });

  it('selects a end date', () => {
    cy.get('[id=endAt]')
      .type('2023-01-01T16:00')
      .should('have.value', '2023-01-01T16:00');
  });

  it('should click button to create event', () => {
    cy.get('[id=btn-add-event]').click();
  });

  it('navigates to a the new event details page', () => {
    console.log(cy.url());
    cy.url().should('include', '/events/');
    cy.get('h1').should('contain', 'Cypress event');

    const dateLabelSelector = '[data-cy=datelabel]';
    cy.get(dateLabelSelector).should(
      'have.text',
      '01/01/2023 10:0001/01/2023 16:00'
    );
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
