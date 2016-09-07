** Challange 2: Recommander system

*** Stage 1
[x] find which users voted same pages as the current user

    db.voters.find({ upVoters: { $elemMatch : {$eq:  <userId>} }},{upVoters:1})

[x] rank the results based on the count of similar votes
    // we use elemMatch only when we want to specify multiple criteria for array elements.
    // it's not our case for now but it's better to have the logic in place

    db.voters.aggregate(
        { $match: { upVoters: { $elemMatch : {$eq:  <userId> } }}},
        { $unwind : "$upVoters" },
        { $group : {
            _id : "$upVoters",
            count: { $sum : 1 }

        }}
    );

[x] get pages that those users voted on in that order

    db.voters.find({ upVoters: { $elemMatch : {$in:  <userList>} }})

[] create template to display recommanded websites
[] display the recommended pages


** Challenge 1: Automatic information]

cd09c48 HEAD@{0}: commit: Challenge 1: Automatic information - client side - raffined fallback
ceb259b HEAD@{1}: commit: Challenge 1: Automatic information - client side - basic functionality


**Steps to take in order to implement it
[x] import http package
[x] get the source page via http
[x] parse the page and extract <title> and <meta name="description">
[x] try to bypass SOP via CORS (cors.io, crossorigin.me)


