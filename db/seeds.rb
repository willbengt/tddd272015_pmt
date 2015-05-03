# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Report.create(date: "04/03/2015", name: "Testname", starttime: "18:00", endtime: "22:00")
Report.create(date: "03/03/2015", name: "William", starttime: "10:00", endtime: "15:00")