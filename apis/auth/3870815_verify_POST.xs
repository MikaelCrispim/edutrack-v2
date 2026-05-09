query verify verb=POST {
  api_group = "Auth"
  auth = "user"

  input {
    text code? filters=trim
  }

  stack {
    db.get user {
      field_name = "id"
      field_value = $auth.id
    } as $user
  
    conditional {
      if ($input.code == $user.auth_code) {
        db.edit user {
          field_name = "id"
          field_value = $auth.id
          data = {auth_code: null, is_verified: true}
        } as $user1
      }
    
      else {
        debug.stop {
          value = "Código inválido!"
        }
      }
    }
  }

  response = $user1
}