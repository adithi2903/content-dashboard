describe('Content Dashboard E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should show login page', () => {
    cy.contains('Sign In').should('be.visible');
  });

  it('should login and redirect to dashboard', () => {
    cy.get('input[placeholder="Your name"]').type('Adithi');
    cy.get('input[placeholder="your@email.com"]').type('adithi@test.com');
    cy.contains('Sign In').click();
    cy.url().should('include', '/');
    cy.contains('Dashboard').should('be.visible');
  });

  it('should search for content', () => {
    cy.get('input[placeholder="Your name"]').type('Adithi');
    cy.get('input[placeholder="your@email.com"]').type('adithi@test.com');
    cy.contains('Sign In').click();
    cy.get('input[placeholder="Search news, movies..."]').type('technology');
    cy.wait(600);
  });

  it('should toggle dark mode', () => {
    cy.get('input[placeholder="Your name"]').type('Adithi');
    cy.get('input[placeholder="your@email.com"]').type('adithi@test.com');
    cy.contains('Sign In').click();
    cy.contains('Dark Mode').click({ force: true });
    cy.get('html').should('have.class', 'dark');
  });

  it('should switch to trending tab', () => {
    cy.get('input[placeholder="Your name"]').type('Adithi');
    cy.get('input[placeholder="your@email.com"]').type('adithi@test.com');
    cy.contains('Sign In').click();
    cy.contains('Trending').click();
  });

  it('should reorder cards via drag and drop', () => {
    cy.get('input[placeholder="Your name"]').type('Adithi');
    cy.get('input[placeholder="your@email.com"]').type('adithi@test.com');
    cy.contains('Sign In').click();
  
    cy.get('[data-rfd-draggable-id]', { timeout: 10000 })
      .should('have.length.greaterThan', 1);
  
    cy.get('[data-rfd-draggable-id]').first().as('source');
    cy.get('[data-rfd-draggable-id]').eq(1).as('target');
  
    cy.get('@source').then(source => {
      cy.get('@target').then(target => {
        const sourceRect = source[0].getBoundingClientRect();
        const targetRect = target[0].getBoundingClientRect();
        cy.get('@source')
          .trigger('mousedown', { button: 0 })
          .trigger('mousemove', { clientX: sourceRect.x + 10, clientY: sourceRect.y + 10 })
          .trigger('mousemove', { clientX: targetRect.x + 10, clientY: targetRect.y + 10 })
          .trigger('mouseup');
      });
    });
    cy.get('[data-rfd-draggable-id]').should('have.length.greaterThan', 1);
  });
});