describe('Rest', () => {
  const apiURL = "https://api.demoblaze.com/";
  
  
  it('Signup new User', () => {

    //genero un numero aleatorio para el usuario (con la finalidad de que no se repita el usuario)
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 10));
    const username = 'mariajose'+ randomNumber

    cy.request('POST', apiURL+'signup', {
      username: username,
      password: '1234567890'
    }).then((response) => {
      expect(response.status).to.eq(200)  
      expect(response.body).to.include("")      
    })
  })

  it('Signup Already exist user', () => {

    cy.request('POST', apiURL+'signup', {
      username: 'username',
      password: 'password'
    }).then((response) => {
      expect(response.status).to.eq(200)  
      expect(response.body).to.have.property('errorMessage', 'This user already exist.')
   
    })
  })

  
  it('Login Ok', () => {

    const password = 'admin'
    const encodedPassword = btoa(password); // Codificar la variable password a Base64

    cy.request('POST', apiURL+ 'login', {
      username: 'admin',
      password: encodedPassword
    }).then((response) => {
      expect(response.status).to.eq(200)  
      cy.wrap(response.body).should('include', 'Auth_token')

      
  
   
    })
  })

  it('Login Wrong', () => {

    cy.request('POST', apiURL+'login', {
      username: 'abcd',
      password: '1111'
    }).then((response) => {
      expect(response.status).to.eq(200)  
      expect(response.body).to.have.property('errorMessage', 'Wrong password.')
   
    })
  })

  
 
})