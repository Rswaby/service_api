# service_api
A simple express app that performs basic crud commands using squelize as an orm.
This app creates new users and new courses. users and course share a relatioship. 
```json
{
        "id": 1,
        "title": "New Course Updated Again Hello",
        "description": "My course description. And again.",
        "estimatedTime": "12 hours",
        "User": {
            "id": 1,
            "firstName": "Joe",
            "lastName": "Smith",
            "emailAddress": "joe@smith.com"
        }
    }
```
only users who are authenticated can retrieve other user information, create a new course, update an existing course ( if they created it), delele and existing course (if they are the owner).

### How to run
```sh
git clone git@github.com:Rswaby/service_api.git
cd service_api
npm run seed (optional)
npm install
npm start
```

