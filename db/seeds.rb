# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Report.create(number: 1, title: "hej")

Timereport.create(name: 'Rasmus', project: 1, time: 1, text:" Trollar lite grann" )
Timereport.create(name: 'Teddy', project: 1, time: 3, text:" Grejar po! " )
User.create(userId: '123456789', userName: 'Teddy', email: 'test@gmail.com', userLevel: 1)
Project.create(name: 'Test Project', totTime: 500, owner: '123456789')
