describe('register page', ()=>{

    beforeEach(() => {
        cy.visit('/register')
    });
    it('should display register component', ()=>{
        cy.contains('Register Form')
    })

    describe('test password validation', ()=>{
        it('focus password, leave empty, focus another input, expect error saying *Please enter the password', ()=>{
            cy.get(`input[formcontrolname="password"]`).focus()
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Please enter the password')
        })
        it('fill password with 7 characters, expect error saying *Password must have at least 8 characters', ()=>{
            cy.get(`input[formcontrolname="password"]`)
            .type('qwertyu')
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Password must have at least 8 characters')
        })
        it('fill password with 8 lowercase characters, expect error saying *Password must contain at least 1 uppercase and 1 lowercase', ()=>{
            cy.get(`input[formcontrolname="password"]`)
            .type('qwertyui')
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Password must contain at least 1 uppercase and 1 lowercase')
        })
        it('fill firstname and then fill password with string containing string from firstname, expect error saying *Password must not contain first name', ()=>{
            cy.get(`input[formcontrolname="firstName"]`)
            .type('test')
            cy.get(`input[formcontrolname="password"]`)
            .type('testabc')
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Password must not contain first name')
        })
        it('fill lastname and then fill password with string containing string from firstname, expect error saying *Password must not contain last name', ()=>{
            cy.get(`input[formcontrolname="lastName"]`)
            .type('test')
            cy.get(`input[formcontrolname="password"]`)
            .type('testabc')
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Password must not contain last name')
        })
    })

    describe('email validation', ()=>{
        it('fill email with not proper email, expect error saying *Please enter correct email, ex: test@gmail.com', ()=>{
            cy.get(`input[formcontrolname="email"]`)
            .type('qwerty')
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Please enter correct email, ex: test@gmail.com')
        })

        it('fill email with proper email, expect to not have error saying *Please enter correct email, ex: test@gmail.com', ()=>{
            cy.get(`input[formcontrolname="email"]`)
            .type('test@wp.pl')
            cy.get(`input[formcontrolname="confirmPassword"]`).focus()
            cy.contains('*Please enter correct email, ex: test@gmail.com').should('not.exist')
        })
    })


    describe('confirm Password validation', ()=>{
        it('fill password and confirmPassword with different strings, expect error saying *Please enter the same password', ()=>{
            cy.get(`input[formcontrolname="password"]`)
            .type('abctestAAA')
            cy.get(`input[formcontrolname="confirmPassword"]`)
            .type('qwerty')
            cy.get(`input[formcontrolname="password"]`).focus()
            cy.contains('*Please enter the same password')
        })

        it('fill password and confirmPassword with the same string, expect to not have error saying *Please enter the same password', ()=>{
            cy.get(`input[formcontrolname="password"]`)
            .type('abctestAAA')
            cy.get(`input[formcontrolname="confirmPassword"]`)
            .type('abctestAAA')
            cy.get(`input[formcontrolname="password"]`).focus()
            cy.contains('*Please enter the same password').should('not.exist')
        })
    })

    describe('register function', ()=>{
        it('fill all inputs and click register, expect toast and cleared form', ()=>{
                cy.get(`input[formcontrolname="firstName"]`)
                    .type('Adrian')
            
                cy.get(`input[formcontrolname="lastName"]`)
                  .type('Fąk')
            
                cy.get(`input[formcontrolname="email"]`)
                  .type('test@wp.pl')
            
                cy.get(`input[formcontrolname="password"]`)
                  .type('Dwadwadwa')
            
                cy.get(`input[formcontrolname="confirmPassword"]`)
                  .type('Dwadwadwa')

                cy.get('.btn-success').click()

                cy.get(`input[formcontrolname="firstName"]`).should('have.value', '')
                cy.get(`input[formcontrolname="lastName"]`).should('have.value', '')
                cy.get(`input[formcontrolname="email"]`).should('have.value', '')
                cy.get(`input[formcontrolname="password"]`).should('have.value', '')
                cy.get(`input[formcontrolname="confirmPassword"]`).should('have.value', '')
                cy.contains('Success')
        })
    })
    
})