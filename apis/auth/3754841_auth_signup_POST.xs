// Signup and retrieve an authentication token
query "auth/signup" verb=POST {
  api_group = "Auth"

  input {
    text name?
    text email?
    password password?
  }

  stack {
    db.get user {
      field_name = "email"
      field_value = $input.name
    } as $user
  
    precondition ($user == null) {
      error_type = "accessdenied"
      error = "This account is already in use."
    }
  
    security.random_number {
      min = 111111
      max = 999999
    } as $random_number
  
    db.add user {
      data = {
        created_at : "now"
        name       : $input.name
        email      : $input.email
        password   : $input.password
        auth_code  : $random_number
        is_verified: false
      }
    } as $user
  
    security.create_auth_token {
      table = "user"
      extras = {}
      expiration = 86400
      id = $user.id
    } as $authToken
  
    api.request {
      url = "https://api.mailgun.net/v3/sandboxeedb352928ed4781b7c96bb8042d0f8d.mailgun.org/messages"
      method = "POST"
      params = {}
        |set:"from":" <postmaster@sandboxeedb352928ed4781b7c96bb8042d0f8d.mailgun.org>"
        |set:"to":$input.email
        |set:"subject":"Hey there!"
        |set:"text":`Seu código de verificação: $user.auth_code`
      headers = []
        |push:("Authorization: Basic %s"
          |sprintf:("api:MAILGUN_API_KEY_PLACEHOLDER"|base64_encode)
        )
    } as $api1
  }

  response = {authToken: $authToken}
}