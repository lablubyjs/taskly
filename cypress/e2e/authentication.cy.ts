describe('Authentication', () => {
  describe('Register', () => {
    it('should be possible to view the register page', () => {
      cy.visit('http://localhost:3000/authentication/register')
    })

    it('should be error messages displayed if no values are provided for the inputs', () => {
      cy.visit('http://localhost:3000/authentication/register')

      cy.get(':nth-child(2) > button').click()

      cy.get(':nth-child(3)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please enter the name')

      cy.get(':nth-child(5)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please enter the email')

      cy.get(':nth-child(7)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please enter the password')
    })

    it('should be error message displayed if invalid email is provided for the email input', () => {
      cy.visit('http://localhost:3000/authentication/register')

      cy.get(':nth-child(3) > input').type('invalid_email')

      cy.get(':nth-child(2) > button').click()

      cy.get(':nth-child(5)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please provide a valid email')
    })

    it('should redirect to login page when clicking or sing in button', () => {
      cy.visit('http://localhost:3000/authentication/register')

      cy.get(':nth-child(1) > form ~ p').click()

      cy.get(':nth-child(2) > p').should('contain', 'Login')
    })

    it('should be displayed a feedback toast container while registration is taking place', () => {
      cy.visit('http://localhost:3000/authentication/register')

      cy.get(':nth-child(2) > input').type('any_name')
      cy.get(':nth-child(3) > input').type('any_email@email.com')
      cy.get(':nth-child(4) > input').type('any_password')

      cy.get(':nth-child(2) > button').click()

      cy.get('.Toastify__toast-container')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Loading')
    })

    it('should redirect to homepage if register is successfully', () => {
      cy.visit('http://localhost:3000/authentication/register')

      cy.get(':nth-child(2) > input').type('any_name')
      cy.get(':nth-child(3) > input').type('any_email@email.com')
      cy.get(':nth-child(4) > input').type('any_password')

      cy.get(':nth-child(2) > button').click()

      cy.get(
        'main > div:last-child > div:first-child > div:first-child > p'
      ).should('contain', 'any_name')
    })
  })

  describe('Login', () => {
    it('should be possible to view the login page', () => {
      cy.visit('http://localhost:3000/authentication/login')
    })

    it('should be error messages displayed if no values are provided for the inputs', () => {
      cy.visit('http://localhost:3000/authentication/login')

      cy.get(':nth-child(2) > button').click()

      cy.get(':nth-child(3)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please enter the email')

      cy.get(':nth-child(5)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please enter the password')
    })

    it('should be error message displayed if invalid email is provided for the email input', () => {
      cy.visit('http://localhost:3000/authentication/login')

      cy.get(':nth-child(2) > input').type('invalid_email')

      cy.get(':nth-child(2) > button').click()

      cy.get(':nth-child(3)')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Please provide a valid email')
    })

    it('should redirect to register page when clicking or sing up button', () => {
      cy.visit('http://localhost:3000/authentication/login')

      cy.get(':nth-child(1) > form ~ p').click()

      cy.get(':nth-child(2) > p').should('contain', 'Register')
    })

    it('should be displayed a feedback toast container while login is taking place', () => {
      cy.visit('http://localhost:3000/authentication/login')

      cy.get(':nth-child(2) > input').type('any_email@email.com')
      cy.get(':nth-child(3) > input').type('any_password')

      cy.get(':nth-child(2) > button').click()

      cy.get('.Toastify__toast-container')
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          return value
        })
        .should('contain', 'Loading')
    })

    it('should redirect to homepage if login is successfully', () => {
      cy.visit('http://localhost:3000/authentication/login')

      cy.get(':nth-child(2) > input').type('any_email@email.com')
      cy.get(':nth-child(3) > input').type('any_password')

      cy.get(':nth-child(2) > button').click()

      cy.get(
        'main > div:last-child > div:first-child > div:first-child > p'
      ).should('contain', 'any_name')
    })
  })
})

export {}