# upskill-aps-backend

A repo for saving what i've done during the upskill course.

technologies used: express, mongodb, graphql
requirements: Database URI

Simple Query:
`{
  books {
    id
    name
    author{
      books{
        name,
        id
      }
    }
  }
}`
