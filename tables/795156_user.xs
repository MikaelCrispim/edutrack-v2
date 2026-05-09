table user {
  auth = true

  schema {
    int id
    timestamp created_at?=now {
      visibility = "private"
    }
  
    text name? filters=trim
    text email? filters=trim
    password password? {
      sensitive = true
      visibility = "internal"
    }
  
    text auth_code? filters=trim
    bool is_verified?
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
}