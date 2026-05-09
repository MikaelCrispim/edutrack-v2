table ai_insights {
  auth = false

  schema {
    // Unique identifier for the AI insight
    int id
  
    // ID of the user for whom the insight was generated
    int user_id {
      table = "user"
    }
  
    // Timestamp of when the insight was created
    timestamp created_at?=now {
      visibility = "private"
    }
  
    // The AI-generated insight text
    text text? filters=trim
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "user_id", op: "asc"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
}