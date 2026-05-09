// Add ai_insights record
query ai_insights verb=POST {
  api_group = "Auth"

  input {
    dblink {
      table = "ai_insights"
    }
  }

  stack {
    db.add ai_insights {
      data = {created_at: "now"}
    } as $ai_insights
  }

  response = $ai_insights
}