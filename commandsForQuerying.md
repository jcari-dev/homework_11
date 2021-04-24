Select by comparasion:

Find all the vampires that that are females{

    db.vampires.find({gender: "f"}).pretty() 

}
have greater than 500 victims {

    db.vampires.find({victims:{ $gt: 500}}).pretty()

}

have fewer than or equal to 150 victims {

    db.vampires.find({victims:{ $lte: 150}}).pretty()

}

have a victim count is not equal to 210234 {

    db.vampires.find({victims:{ $ne: 210234}}).pretty() 

}

have greater than 150 AND fewer than 500 victims {

    db.vampires.find( { $and: [ { victims: { $gt: 150 } }, { victims: { $lt: 500 } } ] } ).pretty()

}

Select by exists or does not exists:

have a key of 'title'

    db.vampires.find( { title : { $exists : true } } ).pretty()

do not have a key of 'victims' 

    db.vampires.find( { title : { $exists : false } } ).pretty()

have a title AND no victims

    db.vampires.find( { $and: [ { title : { $exists : true } }, { victims: { $eq: 0 } } ] } ).pretty()

have victims AND the victims they have are greater than 1000

    db.vampires.find( { $and: [ { title : { $exists : true } }, { victims: { $gt: 1000 } } ] } ).pretty()


Select with OR:

are from New York, New York, US or New Orleans, Louisiana, US

    db.vampires.find( { $or: [ { location: { $eq: "New York, New York, US" } }, { location: "New Orleans, Louisiana, US"} ] } ).pretty()

love brooding or being tragic 

    db.vampires.find({$or: [{ loves: 'brooding', loves: 'being tragic' }]}).pretty()

have more than 1000 victims or love marshmallows 

    db.vampires.find({$or: [{ victims: { $gt: 1000}, loves: 'being tragic'}]}).pretty()

have red hair or green eyes

    db.vampires.find({$or: [{ hair_color: 'red', eye_color: 'green'}]}).pretty()

Select objects that match one of several values:

love either frilly shirtsleeves or frilly collars

    db.vampires.aggregate( [ { $match: { $or: [ { loves: 'frilly shirtsleeves'}, {loves: 'frilly collars'}]}}]).pretty()

love brooding 

    db.vampires.aggregate( [ { $match: { loves: 'brooding'}}]).pretty()

love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music

    db.vampires.aggregate( [ { $match: { $or: [ { loves: 'appearing innocent'}, {loves: 'trickery'}, { loves: 'lurking in rotting mansions'}, { loves: 'R&B music'}]}}]).pretty()

love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *

    db.vampires.find({$and:[{ loves: 'fancy cloaks'}, {loves: { $nin: [ 'top hats', 'virgin blood' ]}}]}).pretty()

Negative Selection: 

love ribbons but do not have brown eyes

    db.vampires.find({$and:[{ loves: 'ribbons'}, {eye_color: { $nin: ['brown']}}]}).pretty()

are not from Rome

    db.vampires.find({ location: { $nin: ['Rome']}}).pretty()

do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]

    db.vampires.find({ loves: { $nin: ['fancy cloaks','frilly shirtsleeves', 'appearing innocent', 'being tragic', 'brooding']}}).pretty()

have not killed more than 200 people

    db.vampires.find({ victims: {$lt: 200}}).pretty()

Replace:

replace the vampire called 'Claudia' with a vampire called 'Eve'. 'Eve' will have a key called 'portrayed_by' with the value 'Tilda Swinton'

    db.vampires.updateOne({ name: 'Claudia'}, {$set : { name: 'Eve'}})
    
    db.vampires.update({name: 'Eve'},{$set:{"portrayed_by":"Tilda Swinton"}})

replace the first male vampire with another whose name is 'Guy Man', and who has a key 'is_actually' with the value 'were-lizard'

    db.vampires.update({ name: 'Count Chocula'}, {$set : { name: 'Guy Man'}})

    db.vampires.update({name: 'Guy Man'},{$set:{"is_actually":"were-lizard"}})

Update:

Update 'Guy Man' to have a gender of 'f'

    db.vampires.update({ name: 'Guy Man'}, {$set : { gender: 'f'}})

Update 'Eve' to have a gender of 'm'

    db.vampires.update({ name: 'Eve'}, {$set : { gender: 'm'}})

Update 'Guy Man' to have an array called 'hates' that includes 'clothes' and 'jobs'

    db.vampires.update({ name: 'Guy Man'}, {$addToSet: { hates: ['clothes', 'jobs']}})

Update 'Guy Man's' hates array also to include 'alarm clocks' and 'jackalopes'

    db.vampires.update( {name: 'Guy Man'},{$push:{hates:['alarm clocks', 'jackalopes']}})

Rename 'Eve's' name field to 'moniker'

    db.vampires.update( { name: 'Eve' }, { $rename: {'name': 'moniker'} } )

We now no longer want to categorize female gender as "f", but rather as fems. 

db.vampires.updateMany({gender: 'f'}, {$set: {gender: 'fems'}})