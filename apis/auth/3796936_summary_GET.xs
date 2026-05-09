query summary verb=GET {
  api_group = "Auth"
  auth = "user"

  input {
  }

  stack {
    var $user {
      value = $auth.id
    }
  
    db.query subjects {
      where = $user == $auth.id
      return = {type: "count"}
    } as $totalSubjects
  
    db.query academic_tasks {
      where = $db.academic_tasks.status == "pending"
      return = {type: "count"}
    } as $pendingActivities
  
    db.query academic_tasks {
      return = {type: "count"}
    } as $totalTasks
  
    var $completionPercentage {
      value = `(($totalTasks - $pendingActivities) / $totalTasks) * 100`|round:1
    }
  }

  response = {
    totalSubjects       : $totalSubjects
    pendingActivities   : $pendingActivities
    completionPercentage: $completionPercentage
  }
}