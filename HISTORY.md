** Challange 2: Recommander system

*** Stage 1
[] find which users voted same pages as the current user
[] rank the results based on the count of similar votes
[] get pages that those users voted on in that order
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


