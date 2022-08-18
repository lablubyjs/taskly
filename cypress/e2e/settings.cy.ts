describe('Settings', () => {
  it('should be possible to view the settings page', async () => {
    cy.login()

    cy.visit('http://localhost:3000/settings')

    cy.url().should('be.equal', 'http://localhost:3000/settings')
  })

  it('should be possible replace the theme mode', () => {
    cy.login()

    cy.visit('http://localhost:3000/settings')

    cy.get('select').select('Dark')

    cy.get(':nth-child(2) > button').click()

    cy.get('body').should('have.css', 'background-color', 'rgb(82, 80, 80)')
  })

  it('should be possible replace the pomodoro timer', () => {
    cy.login()

    cy.visit('http://localhost:3000/settings')

    cy.get('input').clear()

    cy.get('input').type('2')

    cy.get(':nth-child(2) > button').click()

    cy.get('input').should('have.value', '2')

  })

  it('should redirect to home page when clicking \'Go back home\' button', () => {
    cy.login()

    cy.visit('http://localhost:3000/settings')

    cy.get(':nth-child(4) > p').each(($el, index) => {
      if(index === 1) {
        cy.wrap($el).click()
      }
    })

    cy.url().should('be.equal', 'http://localhost:3000')
  })

  it('should possible do logout  when clicking \'Log out\' button', () => {
    cy.login()
    
    cy.visit('http://localhost:3000/settings')

    cy.get(':nth-child(4) > p').each(($el, index) => {
      if(index === 0) {
        cy.wrap($el).click()
      }
    })

    cy.url().should('be.equal', 'http://localhost:3000/authentication/login')
  })
})

export {}
