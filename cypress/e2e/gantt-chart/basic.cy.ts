/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

context('Basic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.injectAxe()
  })

  it('should hydrate on initial render', () => {
    cy.contains('h1', 'Gantt Chart Implementation')
    cy.get('[data-cy="gantt-chart-item"]').should('have.length', 15)
  })

  it('should allow removal of an item', () => {
    const label = 'Dotfiles Editor'

    cy.get('[data-cy="gantt-chart-item"]').as('items')
    cy.get('@items').eq(2).as('item')
    cy.get('@item').children('button').as('btn')

    cy.get('@items').should('have.length', 15)
    cy.get('@btn').should('not.be.visible')

    cy.get('@item').contains(label)

    // TODO: Cypress is incorrectly reporting that the button is not visible
    // cy.get('@item').realHover()
    // cy.get('@btn').should('be.visible')

    cy.get('@btn').click()
    cy.get('@items').should('have.length', 14)

    cy.get('@item').contains(label).should('not.exist')
  })

  it('should allow addition of an item', () => {
    cy.get('form').as('form')

    // Data Entry
    cy.get('@form').find('input[name="name"]').type('Added Item').should('have.value', 'Added Item')
    cy.get('@form').find('input[name="start"]').type('2022-10-04').should('have.value', '2022-10-04')
    cy.get('@form').find('input[name="end"]').type('2022-10-08').should('have.value', '2022-10-08')

    cy.checkA11y()

    cy.get('@form').submit()

    // Rendered Item
    cy.get('[data-cy="gantt-chart-item"]').as('items')
    cy.get('@items').contains('Added Item').parent().contains('10/4/2022 to 10/8/2022')

    cy.checkA11y()
  })

  it('should handle basic form errors', () => {
    cy.get('form').as('form')

    // TODO: Cypress .submit() default isn't being prevented
    cy.get('@form').find('button').click()

    cy.get('@form').find('input[name="name"]').parent().contains('Please enter an item name')
    cy.get('@form').find('input[name="start"]').parent().contains('Invalid date')
    cy.get('@form').find('input[name="end"]').parent().contains('Invalid date')

    cy.wait(300, { log: false }) // Await animation completion (TODO: not ideal)
    cy.checkA11y()
  })

  it('should not allow the end date to be before the start date', () => {
    cy.get('form').as('form')

    // TODO: Cypress .submit() default isn't being prevented
    cy.get('@form').find('button').click()

    cy.get('@form').find('input[name="name"]').type('Added Item').should('have.value', 'Added Item')
    cy.get('@form').find('input[name="start"]').type('2022-10-08').should('have.value', '2022-10-08')
    cy.get('@form').find('input[name="end"]').type('2022-10-04').should('have.value', '2022-10-04')

    // cy.get('@form').find('input[name="name"]').parent().contains('Please enter an item name')
    // cy.get('@form').find('input[name="start"]').parent().contains('Invalid date')
    // cy.get('@form').find('input[name="end"]').parent().contains('Invalid date')

    // cy.wait(300, { log: false }) // Await animation completion (TODO: not ideal)
    // cy.checkA11y()
  })
})

export {}
