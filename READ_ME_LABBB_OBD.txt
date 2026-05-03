http://localhost:3000/coaches  // insert into browser

taskkill /F /IM node.exe   // stop the task

curl -X POST http://localhost:3000/coaches -H "Content-Type: application/json" -d "{\"coach_first_name\":\"Solomon\",\"coach_last_name\":\"Velyky\"}" //insert into terminal


curl -X POST http://localhost:3000/coaches ^
-H "Content-Type: application/json" ^
-d "{\"coatch_first_name\":\"Ivan\",\"coatch_last_name\":\"Petrenco\",\"hourly_pay\":20,\"salary\":2000,\"birth_date\":\'2000-01-01\',\"email\":\"ivan@mail.com\",\"group_id\":1}"



curl -X POST http://localhost:3000/coaches -H "Content-Type: application/json" -d "{\"coatch_first_name\":\"NotIvan\",\"coatch_last_name\":\"Petrenco\",\"hourly_pay\":20,\"salary\":2000,\"birth_date\":\"2000-01-05\",\"email\":\"WWWW@mail.com\",\"group_id\":2}"

curl -X PUT http://localhost:3000/coaches/3 -H "Content-Type: application/json" -d "{\"coatch_first_name\":\"John\",\"coatch_last_name\":\"Doe\",\"hourly_pay\":50,\"salary\":3000,\"birth_date\":\"1990-01-01\",\"email\":\"john@example.com\",\"group_id\":2}"